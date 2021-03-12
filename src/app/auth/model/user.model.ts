import { Permission } from './permission.model';
import { Theme } from './theme.model';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferedTheme: Theme;
  permissions: Permission[];
}
