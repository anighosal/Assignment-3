import { Types } from 'mongoose';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const getBookingsByDate = async (date: Date): Promise<TBooking[]> => {
  return Booking.find({ date }).populate('facility').populate('user');
};
const createBookingIntoDB = async (
  bookingData: TBooking,
): Promise<TBooking> => {
  const booking = new Booking(bookingData);
  await booking.save();
  return booking;
};

const getBookingsByUser = async (userId: string): Promise<TBooking[]> => {
  return Booking.find({ user: userId }).populate('facility').exec();
};

// only admin see all bookings
const getAllBookingsByAdminFromDB = async (): Promise<TBooking[]> => {
  return Booking.find().populate('facility').populate('user');
};

const cancelBookingByUserFromDB = async (
  bookingId: Types.ObjectId,
  userId: Types.ObjectId,
): Promise<TBooking | null> => {
  const booking = await Booking.findById(bookingId).populate('facility');

  if (!booking) {
    return null;
  }

  if (!booking.user.equals(userId)) {
    return null;
  }

  booking.isBooked = 'canceled';
  await booking.save();

  return booking;
};
export const BookingService = {
  getBookingsByDate,
  createBookingIntoDB,
  getBookingsByUser,
  getAllBookingsByAdminFromDB,
  cancelBookingByUserFromDB,
};
