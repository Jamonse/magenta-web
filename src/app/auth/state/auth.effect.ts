import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginRequest, loginSuccess } from './auth.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { LoginResponse } from '../model/login.response';
import { UserData } from '../model/user-data.model';
import { SharedFacade } from 'src/app/shared/state/shared.facade';
import { of } from 'rxjs';
import { displayErrorMessage } from 'src/app/shared/state/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sharedFacade: SharedFacade
  ) {}

  login$ = createEffect(() =>
    // Login action effect
    this.actions$.pipe(
      ofType(loginRequest),
      exhaustMap((
        action // Throttle until first observable completes
      ) =>
        this.authService // Call the API with login data
          .login(action.email, action.password)
          .pipe(
            map((data: LoginResponse) => {
              // Transform API response data to user data
              const user: UserData = this.authService.createUserDetails(data);
              this.sharedFacade.hideLoading();
              return loginSuccess({ user }); // Return login success with user data
            }),
            catchError((err) => {
              const errorMessage = this.authService.getErrorMessage(
                err.error.error.message
              );
              return of(displayErrorMessage({ message: errorMessage }));
            })
          )
      )
    )
  );
}
