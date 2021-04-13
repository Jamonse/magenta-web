import { AuthorizationLevel } from '../model/authorization-level.model';
import { Permission } from '../model/permission.model';

const ACCOUNT: string = 'account';
const PROJECT: string = 'project';
const USER: string = 'user';
const POST: string = 'post';

export const NONE: Permission = {
  name: 'none',
  level: AuthorizationLevel.READ,
};

export const POST_WRITE: Permission = {
  name: POST,
  level: AuthorizationLevel.WRITE,
};

export const ACCOUNT_READ: Permission = {
  name: ACCOUNT,
  level: AuthorizationLevel.READ,
};
export const ACCOUNT_MANAGE: Permission = {
  name: ACCOUNT,
  level: AuthorizationLevel.MANAGE,
};
export const ACCOUNT_WRITE: Permission = {
  name: ACCOUNT,
  level: AuthorizationLevel.WRITE,
};
export const ACCOUNT_ADMIN: Permission = {
  name: ACCOUNT,
  level: AuthorizationLevel.ADMIN,
};

export const PROJECT_READ: Permission = {
  name: PROJECT,
  level: AuthorizationLevel.READ,
};
export const PROJECT_MANAGE: Permission = {
  name: PROJECT,
  level: AuthorizationLevel.MANAGE,
};
export const PROJECT_WRITE: Permission = {
  name: PROJECT,
  level: AuthorizationLevel.WRITE,
};
export const PROJECT_ADMIN: Permission = {
  name: PROJECT,
  level: AuthorizationLevel.ADMIN,
};

export const USER_READ: Permission = {
  name: USER,
  level: AuthorizationLevel.READ,
};
export const USER_MANAGE: Permission = {
  name: USER,
  level: AuthorizationLevel.MANAGE,
};
export const USER_WRITE: Permission = {
  name: USER,
  level: AuthorizationLevel.WRITE,
};
export const USER_ADMIN: Permission = {
  name: USER,
  level: AuthorizationLevel.ADMIN,
};
