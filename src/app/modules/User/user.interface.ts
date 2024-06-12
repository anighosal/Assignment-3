export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
