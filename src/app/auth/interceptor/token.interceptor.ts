import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthFacade } from '../state/auth.facade';
import { catchError, exhaustMap, switchMap, take } from 'rxjs/operators';
import { refreshFail } from '../state/auth.actions';

export const TOKEN_PREFIX = 'Bearer';
export const UNABLE_TO_REFRESH =
  'An unknown error occured, please reconnect to the system';
export const INVALID_TOKEN = 'INVALID_TOKEN';

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
        return next.handle(request).pipe(
          catchError((err) => {
            // Error might be an invalid JWT
            if (err instanceof HttpResponse && err.status === 403) {
              return this.handleError(err, request, next);
            }
            return throwError(err);
          })
        );
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

  private handleError(
    err: HttpResponse<any>,
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<any> {
    if (err.body.error.message !== INVALID_TOKEN) {
      return throwError(err); // Error is not an invalid jwt
    }
    return this.authFacade.getRefreshToken().pipe(
      take(1), // Get refresh token
      switchMap((refreshToken) => {
        if (refreshToken) {
          // Perform JWT refresh using refresh token
          this.authFacade.refreshJwt(refreshToken);
          return next.handle(request);
        } // Refresh token itself is not valid
        return of(refreshFail({ errorMessage: UNABLE_TO_REFRESH }));
      })
    );
  }
}
