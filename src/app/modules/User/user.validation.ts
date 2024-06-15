import { z } from 'zod';
import { USER_Role, USER_STATUS } from './user.constant';

const createAdminValidations = z.object({
  body: z.object({
    name: z.string(),
    role: z.nativeEnum(USER_Role).default(USER_Role.ADMIN),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    status: z.nativeEnum(USER_STATUS).default(USER_STATUS.ACTIVE),
  }),
});

const createUserValidations = z.object({
  body: z.object({
    name: z.string(),
    role: z.nativeEnum(USER_Role),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    status: z.nativeEnum(USER_STATUS).default(USER_STATUS.ACTIVE),
  }),
});

export const UserValidations = {
  createAdminValidations,
  createUserValidations,
};
