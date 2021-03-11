export interface SharedState {
  loading: boolean;
  errorMessage: string;
}

export const initialState: SharedState = {
  loading: false,
  errorMessage: '',
};
