import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginFail,
  loginRequest,
  loginSuccess,
  logoutAction,
  refreshFail,
  refreshLogin,
  refreshRequest,
  refreshSuccess,
} from './auth.actions';
import {
  catchError,
  exhaustMap,
  finalize,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
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
          this.sharedFacade.displayGeneralLoading();
          return this.authService // Call the API with login data
            .login(action.email, action.password)
            .pipe(
              map((data: UserData) => {
                // Transform API response data to user data
                const user: UserData = this.authService.createUserDetails(data);
                this.authService.saveUserInLocalStorage(data);
                return loginSuccess({ user, redirect: true }); // Return login success with user data
              }),
              catchError((err) => {
                this.sharedFacade.hideGeneralLoading();
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

  refreshAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refreshRequest), // Refresh JWT using refresh token
      exhaustMap((action) => {
        this.sharedFacade.displayGeneralLoading();
        return this.authService.refreshToken(action.refreshToken).pipe(
          map((newJwt) => {
            // Uppon successfull new jwt request, update local storage and return refresh success action
            this.authService.updateLocalStorageJwt(newJwt);
            return refreshSuccess({ jwt: newJwt });
          }),
          catchError((err) => {
            console.log(err);
            // Uppon failure, get error message and return refresh fail action
            const errorMessage = this.authService.getErrorMessage(
              err.error.message
            );
            return of(refreshFail({ errorMessage: errorMessage }));
          }),
          finalize(() => this.sharedFacade.hideGeneralLoading())
        );
      })
    );
  });

  loginFail$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginFail),
        tap(() => {
          this.router.navigateToLoginPage();
        })
      );
    },
    { dispatch: false }
  );

  refreshFail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refreshFail),
      exhaustMap((action) => {
        return of(displayErrorMessage({ message: action.errorMessage }));
      })
    );
  });

  logoutAction$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction, refreshFail), // Refresh fail effect is simillar to logout
        exhaustMap(() => {
          // Perform logout cleanup and navigation
          this.router.navigateToLoginPage();
          return this.authService.logout();
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
            this.sharedFacade.hideGeneralLoading();
            this.router.navigateToHomePage();
          }
        })
      );
    }, // Do not dispatch any action (no returned value)
    { dispatch: false }
  );
}
