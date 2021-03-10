import { User } from './user.model';

export interface UserData {
  user: User;
  jwt: string;
  refreshToken: string;
}
