import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginFail,
  loginRequest,
  loginSuccess,
  logoutAction,
  refreshLogin,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { UserData } from '../model/user-data.model';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { of } from 'rxjs';
import { displayErrorMessage } from 'src/app/shared/state/shared.actions';
import { RoutingService } from 'src/app/shared/route/routing.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sharedFacade: SharedFacade,
    private router: RoutingService
  ) {}

  login$ = createEffect(() =>
    // Login action effect
    this.actions$.pipe(
      ofType(loginRequest),
      exhaustMap(
        (
          action // Throttle until first observable completes
        ) => {
          this.sharedFacade.displayLoading();
          return this.authService // Call the API with login data
            .login(action.email, action.password)
            .pipe(
              tap(),
              map((data: UserData) => {
                // Transform API response data to user data
                const user: UserData = this.authService.createUserDetails(data);
                this.authService.saveUserInLocalStorage(data);
                this.sharedFacade.hideLoading();
                return loginSuccess({ user, redirect: true }); // Return login success with user data
              }),
              catchError((err) => {
                this.sharedFacade.hideLoading();
                // Get error message with API error code
                const errorMessage = this.authService.getErrorMessage(
                  err.error.message
                ); // Display the error with error message service
                return of(displayErrorMessage({ message: errorMessage }));
              })
            );
        }
      )
    )
  );

  refreshLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refreshLogin),
      mergeMap((action) => {
        // Try getting user data from local storage
        const user = this.authService.getUserFromLocalStorage();
        if (user) {
          // if it exists, set it in the state
          return of(loginSuccess({ user, redirect: false }));
        } else {
          return of(loginFail());
        }
      })
    );
  });

  loginFail$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginFail),
        map(() => {
          this.router.navigateToLoginPage();
        })
      );
    },
    { dispatch: false }
  );

  logoutAction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.authService.logout();
          this.router.navigateToLoginPage();
        })
      );
    },
    { dispatch: false }
  );

  loginRedicrect$ = createEffect(
    () => {
      // Redirect to home page after login success action is fired
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigateToHomePage();
          }
        })
      );
    }, // Do not dispatch any action (no returned value)
    { dispatch: false }
  );
}
