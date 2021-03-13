import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthFacade } from '../state/auth.facade';
import { exhaustMap, switchMap } from 'rxjs/operators';

export const AUTH_HEADER = 'Authorization';
export const TOKEN_PREFIX = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authFacade.getJwt().pipe(
      exhaustMap((token) => {
        // Get JWT from state
        if (token) {
          // Token exists, modify request and add to authorization header
          request = request.clone({
            headers: request.headers.set(
              AUTH_HEADER,
              `${TOKEN_PREFIX} ${token}`
            ),
          });
        }
        return next.handle(request);
      })
    );
  }
}
