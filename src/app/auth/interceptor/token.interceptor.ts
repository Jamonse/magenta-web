import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthFacade } from '../state/auth.facade';
import { exhaustMap, take } from 'rxjs/operators';

export const TOKEN_PREFIX = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authFacade.getJwt().pipe(
      take(1),
      exhaustMap((token) => {
        // Get JWT from state
        if (token) {
          // Token exists, modify request and add to authorization header
          request = this.addToken(request, token);
        }
        return next.handle(request);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return (request = request.clone({
      setHeaders: {
        Authorization: `${TOKEN_PREFIX} ${token}`,
      },
    }));
  }
}
