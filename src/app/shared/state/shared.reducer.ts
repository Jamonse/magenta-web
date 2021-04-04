import { createReducer, on } from '@ngrx/store';
import {
  displayContentLoading,
  displayErrorMessage,
  displayGeneralLoading,
} from './shared.actions';
import { sharedInitialState } from './shared.state';

const _sharedReducer = createReducer(
  sharedInitialState,
  on(displayGeneralLoading, (state, action) => {
    return { ...state, generalLoading: action.status };
  }),
  on(displayContentLoading, (state, action) => {
    return { ...state, contentLoading: action.status };
  }),
  on(displayErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
