import {Injectable, Inject} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {WatchQueryOptions, MutationOptions} from 'apollo-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GraphQLService {
  private static AUTH_CLIENT_NAME = 'auth';

  constructor(
    private apollo: Apollo,
    httpLink: HttpLink,
    @Inject('GRAPHQL_ENDPOINT') graphQlEndpoint: string,
    @Inject('GRAPHQL_AUTH_ENDPOINT') graphQlAuthEndpoint: string,
  ) {
    this.apollo.create({
      link: httpLink.create({uri: graphQlEndpoint}),
      cache: new InMemoryCache(),
    });
    this.apollo.createNamed(GraphQLService.AUTH_CLIENT_NAME, {
      link: httpLink.create({uri: graphQlAuthEndpoint}),
      cache: new InMemoryCache(),
    });
  }

  // TODO: introuduce watch query after moving to mutate
  query(options: WatchQueryOptions): Observable<any> {
    return this.apollo.query(options);
  }

  queryAuth(options: WatchQueryOptions): Observable<any> {
    return this.apollo.use(GraphQLService.AUTH_CLIENT_NAME).query(options);
  }

  mutate(options: MutationOptions): Observable<any> {
    return this.apollo.mutate(options);
  }

  mutateAuth(options: MutationOptions): Observable<any> {
    return this.apollo.use(GraphQLService.AUTH_CLIENT_NAME).mutate(options);
  }

  resetStore(): Promise<void> {
    return Promise.all([
      this.apollo.getClient().resetStore(),
      this.apollo
        .use(GraphQLService.AUTH_CLIENT_NAME)
        .getClient()
        .resetStore(),
    ]).then(() => {});
  }
}
