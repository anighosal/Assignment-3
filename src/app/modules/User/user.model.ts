import bcryptjs from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import config from '../../config';
import { USER_Role, USER_STATUS } from './user.constant';
import { TUser } from './user.interface';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_Role),
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const User = mongoose.model<TUser>('User', userSchema);

export default User;
