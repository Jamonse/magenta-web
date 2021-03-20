import { Privilege } from './privilege.model';

export class Permission {
  constructor(public name: string, public level: string) {}

  public static resolvePrivilege(
    grantedPrivilege: Privilege,
    requiredPermission: Permission
  ): boolean {
    if (grantedPrivilege.name !== requiredPermission.name) {
      return false;
    }
    let requiredLevel = 0;
    let grantedLevel = -1;
    switch (requiredPermission.level) {
      case 'ADMIN':
        requiredLevel = 4;
        break;
      case 'WRITE':
        requiredLevel = 3;
        break;
      case 'MANAGE':
        requiredLevel = 2;
        break;
      case 'READ':
        requiredLevel = 1;
        break;
    }
    switch (grantedPrivilege.level) {
      case 'ADMIN':
        grantedLevel = 4;
        break;
      case 'WRITE':
        grantedLevel = 3;
        break;
      case 'MANAGE':
        grantedLevel = 2;
        break;
      case 'READ':
        grantedLevel = 1;
        break;
    }
    return grantedLevel >= requiredLevel;
  }
}
