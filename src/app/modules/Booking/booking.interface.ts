import { Types } from 'mongoose';

export interface TBooking {
  user: Types.ObjectId; // user is defined as Types.ObjectId
  facility: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}
