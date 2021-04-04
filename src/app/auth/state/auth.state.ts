import { User } from '../model/user.model';

export interface AuthState {
  user: User | null;
  jwt: string | null;
  refreshToken: string | null;
}

export const authInitialState: AuthState = {
  user: null,
  jwt: null,
  refreshToken: null,
};
