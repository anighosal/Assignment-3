import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/appError';
import { USER_Role, USER_STATUS } from '../modules/User/user.constant';
import User from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';

export const auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

    if (!accessToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    const verifiedToken = jwt.verify(
      accessToken as string,
      config.jwt_access_token as string,
    ) as JwtPayload;

    const { role, email } = verifiedToken;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.status === USER_STATUS.BLOCKED) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is blocked');
    }

    if (!requiredRoles.includes(role as keyof typeof USER_Role)) {
      throw new AppError(401, 'You are not authorized to access this route');
    }

    req.user = user as JwtPayload; // Attach user to request

    next();
  });
};
