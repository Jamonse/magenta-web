import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginRequest, loginSuccess } from './auth.actions';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { LoginResponse } from '../model/login.response';
import { UserData } from '../model/user-data.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
              return loginSuccess({ user }); // Return login success with user data
            })
          )
      )
    )
  );
}
