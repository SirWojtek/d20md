import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/zip';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {JwtHelperService} from '@auth0/angular-jwt';

import {jsonHeader} from '../json-header';
import {identifyUser} from '../logrocket';
import {GraphQLService} from '../graphql.service';
import {
  resetPasswordMutation,
  changePasswordWithCodeMutation,
  changePasswordMutation,
} from '../user-queries.graphql';

class DecodedToken {
  id;
  email;
  usertype;

  constructor(token: any) {
    if (!token) {
      return;
    }

    this.id = token.id;
    this.email = token.email;
    this.usertype = token.usertype;
  }
}

@Injectable()
export class UserService {
  private actionUrl: string;
  private jwtHelper = new JwtHelperService();
  private currentLogin = new BehaviorSubject<DecodedToken>(null);
  private currentLoginObservable = this.currentLogin.asObservable();

  constructor(
    private _http: HttpClient,
    @Inject('API_ENDPOINT') apiEndpoint: string,
    private graphQLService: GraphQLService,
  ) {
    this.actionUrl = apiEndpoint + '/user';
    this.currentLogin.next(new DecodedToken(this.getDecodedToken()));
  }

  getEmail(): Observable<string> {
    return this.currentLoginObservable.map(
      (token: DecodedToken) => token.email,
    );
  }

  getId(): Observable<string> {
    return this.currentLoginObservable.map((token: DecodedToken) => token.id);
  }

  getUserType(): Observable<string> {
    return this.currentLoginObservable.map(
      (token: DecodedToken) => token.usertype,
    );
  }

  getCurrentUserType(): string {
    return this.currentLogin.getValue().usertype;
  }

  isLoggedInSync(): boolean {
    return this.currentLogin.getValue().id != null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentLoginObservable.map(
      (token: DecodedToken) => token.id != null,
    );
  }

  isAdmin(): Observable<boolean> {
    return this.currentLoginObservable.map(token => token.usertype === 'admin');
  }

  login(email: string, password: string): Observable<void> {
    return this._http
      .post(
        this.actionUrl + '/login',
        {email: email, password: password},
        {headers: jsonHeader},
      )
      .do((json: any) => {
        localStorage.setItem('id_token', json.token);
        this.currentLogin.next(
          new DecodedToken(this.jwtHelper.decodeToken(json.token)),
        );
        identifyUser(email);
      });
  }

  logout(): void {
    localStorage.removeItem('id_token');
    this.currentLogin.next(new DecodedToken(null));
  }

  createAccount(
    email: string,
    password: string,
    recaptcha: string,
  ): Observable<void> {
    return this._http
      .post(
        this.actionUrl + '/create',
        {email, password, recaptcha},
        {headers: jsonHeader},
      )
      .map(response => null);
  }

  resetPassword(email: string): Observable<void> {
    return this.graphQLService
      .mutate({
        mutation: resetPasswordMutation,
        variables: {email},
      })
      .map(res => null);
  }

  changePassword(newPassword: string, code: string): Observable<void> {
    return this.graphQLService
      .mutate({
        mutation: changePasswordWithCodeMutation,
        variables: {newPassword, code},
      })
      .map(res => null);
  }

  changePasswordAuth(newPassword: string): Observable<void> {
    return this.graphQLService
      .mutateAuth({
        mutation: changePasswordMutation,
        variables: {newPassword},
      })
      .map(res => null);
  }

  canEdit(modelObject: any): Observable<boolean> {
    return Observable.zip(this.getId(), this.isAdmin(), (id, isAdmin) => {
      return {id, isAdmin};
    }).map((ziped: {id: string; isAdmin: boolean}) =>
      this.canModify(ziped, modelObject),
    );
  }

  activate(code: string): Observable<void> {
    const params = new HttpParams().set('code', code);

    return this._http
      .get(this.actionUrl + '/validate', {params})
      .map(response => null);
  }

  private getDecodedToken() {
    const token = localStorage.getItem('id_token');
    if (token === 'undefined') {
      return null;
    } else if (this.jwtHelper.isTokenExpired(token)) {
      return null;
    }
    return this.jwtHelper.decodeToken(token);
  }

  private canModify(
    loginAndIsAdmin: {id: string; isAdmin: boolean},
    model: any,
  ): boolean {
    if (!loginAndIsAdmin.id) {
      return false;
    }
    if (loginAndIsAdmin.isAdmin) {
      return true;
    }
    return loginAndIsAdmin.id === model.User.id;
  }
}
