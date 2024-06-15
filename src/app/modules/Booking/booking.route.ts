// booking.routes.ts
import express from 'express';
import { auth } from '../../middlewares/auth'; // Ensure correct path
import { BookingController } from './booking.controller';
import { validateBookingCreation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  auth('USER'),
  validateBookingCreation,
  BookingController.createBooking,
);
router.get('/', BookingController.getBookings);

export const BookingRoutes = router;
