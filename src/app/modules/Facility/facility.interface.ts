import { Types } from 'mongoose';

export type TFacility = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
  createdBy: Types.ObjectId;
};
