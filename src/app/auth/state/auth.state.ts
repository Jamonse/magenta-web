import { User } from '../model/user.model';

export interface AuthState {
  user: User | null;
  jwt: string | null;
  refreshToken: string | null;
}

export const initialState: AuthState = {
  user: null,
  jwt: null,
  refreshToken: null,
};
