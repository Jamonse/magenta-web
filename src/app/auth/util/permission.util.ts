import { Permission } from '../model/permission.model';

const ACCOUNT: string = 'account';
const PROJECT: string = 'project';
const USER: string = 'user';
const POST: string = 'post';

const READ: string = 'READ';
const MANAGE: string = 'MANAGE';
const WRITE: string = 'WRITE';
const ADMIN: string = 'ADMIN';

export const NONE: Permission = { name: 'none', level: READ };

export const POST_WRITE: Permission = { name: POST, level: WRITE };

export const ACCOUNT_READ: Permission = { name: ACCOUNT, level: READ };
export const ACCOUNT_MANAGE: Permission = { name: ACCOUNT, level: MANAGE };
export const ACCOUNT_WRITE: Permission = { name: ACCOUNT, level: WRITE };
export const ACCOUNT_ADMIN: Permission = { name: ACCOUNT, level: ADMIN };

export const PROJECT_READ: Permission = { name: PROJECT, level: READ };
export const PROJECT_MANAGE: Permission = { name: PROJECT, level: MANAGE };
export const PROJECT_WRITE: Permission = { name: PROJECT, level: WRITE };
export const PROJECT_ADMIN: Permission = { name: PROJECT, level: ADMIN };

export const USER_READ: Permission = { name: USER, level: READ };
export const USER_MANAGE: Permission = { name: USER, level: MANAGE };
export const USER_WRITE: Permission = { name: USER, level: WRITE };
export const USER_ADMIN: Permission = { name: USER, level: ADMIN };
