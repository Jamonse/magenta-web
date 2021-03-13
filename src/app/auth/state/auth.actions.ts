import { createAction, props } from '@ngrx/store';
import { UserData } from '../model/user-data.model';

export const LOGIN_REQUEST = '[login page] login request';
export const LOGIN_SUCCESS = '[login page] login success';
export const LOGIN_FAIL = '[login page] login fail';
export const REFRESH_LOGIN = '[login page] refresh login';
export const LOGOUT_ACTION = '[login page] logout action';

export const loginRequest = createAction(
  LOGIN_REQUEST,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: UserData; redirect: boolean }>()
);

export const loginFail = createAction(LOGIN_FAIL);

export const refreshLogin = createAction(REFRESH_LOGIN);

export const logoutAction = createAction(LOGOUT_ACTION);
