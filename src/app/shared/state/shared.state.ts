export interface SharedState {
  generalLoading: boolean;
  contentLoading: boolean;
  errorMessage: string;
}

export const initialState: SharedState = {
  generalLoading: false,
  contentLoading: false,
  errorMessage: '',
};
