import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'User is created successfully!',
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createUser,
};
