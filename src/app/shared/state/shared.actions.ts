import { createAction, props } from '@ngrx/store';

export const DISPLAY_GENERAL_LOADING = '[shared state] display general loading';
export const DISPLAY_CONTENT_LOADING = '[shared state] display content loading';
export const DISPLAY_ERROR_MESSAGE = '[shared state] display error message';

export const displayGeneralLoading = createAction(
  DISPLAY_GENERAL_LOADING,
  props<{ status: boolean }>()
);

export const displayContentLoading = createAction(
  DISPLAY_CONTENT_LOADING,
  props<{ status: boolean }>()
);

export const displayErrorMessage = createAction(
  DISPLAY_ERROR_MESSAGE,
  props<{ message: string }>()
);
