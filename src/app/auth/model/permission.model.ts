import { AuthorizationLevel } from './authorization-level.model';
import { Privilege } from './privilege.model';

export class Permission {
  constructor(public name: string, public level: AuthorizationLevel) {}

  public static resolvePrivilege(
    grantedPrivilege: Privilege,
    requiredPermission: Permission
  ): boolean {
    if (grantedPrivilege.name !== requiredPermission.name) {
      return false;
    }
    return grantedPrivilege.level >= requiredPermission.level;
  }
}
