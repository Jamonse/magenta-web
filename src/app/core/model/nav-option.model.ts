import { Permission } from 'src/app/auth/model/permission.model';

export interface NavOption {
  icon: string;
  name: string;
  navTo: string;
  requiredPermission: Permission;
}
