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
    { startTime: '07:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '13:00' },
    { startTime: '13:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '19:00' },
    { startTime: '19:00', endTime: '22:00' },
    { startTime: '22:00', endTime: '24:00' },
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
