import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import { AvailabilityRoutes } from './app/modules/Availability/availability.route';
import { BookingRoutes } from './app/modules/Booking/booking.route';
import { FacilityRoutes } from './app/modules/Facility/facility.route';
import { UserRoutes } from './app/modules/User/user.route';

const app = express();

//parsers
app.use(express.json());

app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/facility', FacilityRoutes);
app.use('/api/bookings', BookingRoutes);
app.use('/api', AvailabilityRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Next!');
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
