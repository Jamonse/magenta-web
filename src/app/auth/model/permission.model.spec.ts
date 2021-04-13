import {
  ACCOUNT_ADMIN,
  ACCOUNT_READ,
  ACCOUNT_WRITE,
  USER_MANAGE,
  USER_READ,
  USER_WRITE,
} from '../util/permission.util';
import { Permission } from './permission.model';
import { Privilege } from './privilege.model';

describe('Permission Model', () => {
  it('should create permission', () => {
    const permission = new Permission('permission', 'READ');

    expect(permission).toBeTruthy();
  });

  it('should return false when permission and privilege has different names', () => {
    const permission: Permission = ACCOUNT_ADMIN;
    const privilege: Privilege = {
      id: 1,
      name: 'different name',
      level: 'ADMIN',
    };

    expect(Permission.resolvePrivilege(privilege, permission)).toBeFalse();
  });

  it('should grant access to admin on write required permission', () => {
    const permission: Permission = ACCOUNT_WRITE;
    const privilege: Privilege = {
      id: 1,
      ...ACCOUNT_ADMIN,
    };

    expect(Permission.resolvePrivilege(privilege, permission)).toBeTruthy();
  });

  it('should grant access to write with manage required permission', () => {
    const permission: Permission = USER_MANAGE;
    const privilege: Privilege = {
      id: 1,
      ...USER_WRITE,
    };

    expect(Permission.resolvePrivilege(privilege, permission)).toBeTruthy();
  });

  it('should grant access with same permission level', () => {
    const permission: Permission = USER_READ;
    const privilege: Privilege = {
      id: 1,
      ...USER_READ,
    };

    expect(Permission.resolvePrivilege(privilege, permission)).toBeTruthy();
  });
});
