import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthFacade } from '../state/auth.facade';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { refreshSuccess } from '../state/auth.actions';

export const TOKEN_PREFIX = 'Bearer';
export const UNABLE_TO_REFRESH =
  'An unknown error occured, please reconnect to the system';
export const INVALID_TOKEN = 'INVALID_TOKEN';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  constructor(private authFacade: AuthFacade, private actions$: Actions) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.indexOf('refresh') !== -1 ||
      request.url.indexOf('login') !== -1 ||
      request.url.indexOf('logout') !== -1
    ) {
      return next.handle(request);
    }
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
            if (err instanceof HttpErrorResponse && err.status === 403) {
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
    err: HttpErrorResponse,
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<any> {
    if (err.error !== INVALID_TOKEN) {
      return throwError(err); // Error is not an invalid jwt
    } // If token not yet refreshing, start refresh process
    if (!this.isTokenRefreshing) {
      // Set is refreshing to true
      this.isTokenRefreshing = true;
      // Get refresh token from state
      return this.authFacade.getRefreshToken().pipe(
        take(1),
        switchMap((refreshToken) => {
          if (refreshToken) {
            // Perform refresh
            this.authFacade.refreshJwt(refreshToken);
          } // Listen to refresh success action
          return this.actions$.pipe(
            ofType(refreshSuccess),
            take(1),
            exhaustMap((newJwt) => {
              // Upon receiving payload, perofrm request with new JWT
              this.isTokenRefreshing = false;
              return next.handle(this.addToken(request, newJwt.jwt));
            })
          );
        })
      );
    }
    return next.handle(request);
  }
}
