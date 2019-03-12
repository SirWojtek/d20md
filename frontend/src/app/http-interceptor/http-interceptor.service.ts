import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { ReqeustCounterService } from './request-counter.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private requestCounterService: ReqeustCounterService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCounterService.register();

    return next.handle(request)
      .do((req) => {
        if (req instanceof HttpResponse) {
          this.requestCounterService.complete();
        }
      })
      .catch((err) => {
        this.requestCounterService.complete();
        return Observable.throw(err);
      });
  }
}
