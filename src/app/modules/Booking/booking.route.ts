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

router.get('/user', auth('USER'), BookingController.getBookingsByUser);
router.get('/', auth('ADMIN'), BookingController.getAllBookingsFromAdminView);
router.delete('/:id', auth('USER'), BookingController.cancelBookingByUser);

export const BookingRoutes = router;
