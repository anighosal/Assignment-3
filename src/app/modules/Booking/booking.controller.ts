import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import { Facility } from '../Facility/facility.model';
import { TBooking } from './booking.interface';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { facility, date, startTime, endTime } = req.body;
  const userId = req.user._id;

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

const getBookingsByUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const bookings = await BookingService.getBookingsByUser(userId);
  if (!bookings) {
    return res.status(404).json({
      success: false,
      message: 'No data found',
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    message: 'Bookings retrieved successfully',
    data: bookings,
  });
});

const getAllBookingsFromAdminView = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await BookingService.getAllBookingsByAdminFromDB();

    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: 'No data found',
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  },
);

const cancelBookingByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookingId = req.params.id;
    const userId = req.user._id as Types.ObjectId;

    const canceledBooking = await BookingService.cancelBookingByUserFromDB(
      new Types.ObjectId(bookingId),
      userId,
    );

    if (!canceledBooking) {
      return res.status(404).json({
        success: false,
        message:
          'Booking not found or you are not authorized to cancel this booking',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: canceledBooking,
    });
  },
);
export const BookingController = {
  createBooking,
  getBookingsByUser,
  getAllBookingsFromAdminView,
  cancelBookingByUser,
};
