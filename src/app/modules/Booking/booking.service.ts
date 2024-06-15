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

const getBookingsFromDB = async (): Promise<TBooking[]> => {
  return Booking.find().populate('user').populate('facility');
};
export const BookingService = {
  getBookingsByDate,
  createBookingIntoDB,
  getBookingsFromDB,
};
