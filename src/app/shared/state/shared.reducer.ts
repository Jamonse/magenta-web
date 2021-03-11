import { createReducer, on } from '@ngrx/store';
import { displayErrorMessage, displayLoading } from './shared.actions';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(displayLoading, (state, action) => {
    return { ...state, displayLoading: action.status };
  }),
  on(displayErrorMessage, (state, action) => {
    return { ...state, errorMessage: action.message };
  })
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
