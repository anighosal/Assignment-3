import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

import moment from 'moment';
import { TBooking } from '../Booking/booking.interface';
import { BookingService } from '../Booking/booking.service';

const getAvailableSlots = (
  bookings: TBooking[],
  totalSlots: { startTime: string; endTime: string }[],
) => {
  const availableSlots: { startTime: string; endTime: string }[] = [];

  totalSlots.forEach((slot) => {
    let isAvailable = true;

    bookings.forEach((booking) => {
      const bookingStart = moment(booking.startTime, 'HH:mm');
      const bookingEnd = moment(booking.endTime, 'HH:mm');
      const slotStart = moment(slot.startTime, 'HH:mm');
      const slotEnd = moment(slot.endTime, 'HH:mm');

      if (
        slotStart.isBetween(bookingStart, bookingEnd, undefined, '[)') ||
        slotEnd.isBetween(bookingStart, bookingEnd, undefined, '(]') ||
        (slotStart.isSameOrBefore(bookingStart) &&
          slotEnd.isSameOrAfter(bookingEnd))
      ) {
        isAvailable = false;
      }
    });

    if (isAvailable) {
      availableSlots.push(slot);
    }
  });

  return availableSlots;
};

const checkAvailability = catchAsync(async (req: Request, res: Response) => {
  const dateQuery = req.query.date as string;
  const date = dateQuery ? new Date(dateQuery) : new Date();

  const bookings = await BookingService.getBookingsByDate(date);

  const totalSlots = [
    { startTime: '00:00', endTime: '03:00' },
    { startTime: '03:00', endTime: '06:00' },
    { startTime: '06:00', endTime: '09:00' },
    { startTime: '09:00', endTime: '12:00' },
    { startTime: '12:00', endTime: '15:00' },
    { startTime: '15:00', endTime: '18:00' },
    { startTime: '18:00', endTime: '21:00' },
    { startTime: '21:00', endTime: '24:00' },
  ];

  const availableSlots = getAvailableSlots(bookings, totalSlots);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Availability checked successfully',
    data: availableSlots,
  });
});

export const AvailabilityController = {
  checkAvailability,
};
