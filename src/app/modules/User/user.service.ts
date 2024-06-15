import { TUser } from './user.interface';
import User from './user.model';

const createAdminIntoDB = async (payload: TUser) => {
  const admin = await User.create(payload);
  return admin;
};

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

export const UserServices = {
  createAdminIntoDB,
  createUserIntoDB,
};
