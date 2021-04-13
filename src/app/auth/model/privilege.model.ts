import { AuthorizationLevel } from './authorization-level.model';

export interface Privilege {
  id: number;
  name: string;
  level: AuthorizationLevel;
}
