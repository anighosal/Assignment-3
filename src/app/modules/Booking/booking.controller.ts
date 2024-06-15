import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { Facility } from '../Facility/facility.model';
import { TBooking } from './booking.interface';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { facility, date, startTime, endTime } = req.body;
  const userId = req.user._id;
  console.log(userId);

  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    return res.status(404).json({
      success: false,
      message: 'Facility not found',
    });
  }

  const start = new Date(`2030-01-01T${startTime}`);
  const end = new Date(`2030-01-01T${endTime}`);
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationInHours * facilityData.pricePerHour;

  const bookingData: TBooking = {
    facility,
    date,
    startTime,
    endTime,
    user: userId,
    payableAmount,
    isBooked: 'confirmed',
  };

  const newBooking = await BookingService.createBookingIntoDB(bookingData);
  return res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: newBooking,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingService.getBookingsFromDB();
  res.status(200).json({
    success: true,
    data: bookings,
  });
});

export const BookingController = {
  createBooking,
  getBookings,
};
