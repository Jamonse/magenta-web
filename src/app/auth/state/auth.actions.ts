import { createAction, props } from '@ngrx/store';
import { UserData } from '../model/user-data.model';

export const LOGIN_REQUEST = '[login page] login request';
export const LOGIN_SUCCESS = '[login page] login success';
export const LOGIN_FAIL = '[login page] login fail';
export const REFRESH_LOGIN = '[login page] refresh login';
export const LOGOUT_ACTION = '[login page] logout action';

export const REFRESH_REQUEST = '[login page] refresh request';
export const REFRESH_SUCCESS = '[login page] refresh success';
export const REFRESH_FAIL = '[login page] refresh fail';

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

export const refreshRequest = createAction(
  REFRESH_REQUEST,
  props<{ refreshToken: string }>()
);

export const refreshSuccess = createAction(
  REFRESH_SUCCESS,
  props<{ jwt: string }>()
);

export const refreshFail = createAction(
  REFRESH_FAIL,
  props<{ errorMessage: string }>()
);
