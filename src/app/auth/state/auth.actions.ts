import { createAction, props } from '@ngrx/store';
import { UserData } from '../model/user-data.model';
import { User } from '../model/user.model';

export const LOGIN_REQUEST = '[login page] login request';
export const LOGIN_SUCCESS = '[login page] login success';
export const LOGIN_FAIL = '[login page] login fail';

export const loginRequest = createAction(
  LOGIN_REQUEST,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: UserData }>()
);
export const loginFail = createAction(LOGIN_FAIL);
