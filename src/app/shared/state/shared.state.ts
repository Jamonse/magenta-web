export interface SharedState {
  generalLoading: boolean;
  contentLoading: boolean;
  errorMessage: string;
}

export const sharedInitialState: SharedState = {
  generalLoading: false,
  contentLoading: false,
  errorMessage: '',
};
