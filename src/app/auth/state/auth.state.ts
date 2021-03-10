import { UserData } from '../model/user-data.model';

export interface AuthState {
  user: UserData | null;
}

export const initialState: AuthState = {
  user: null,
};
