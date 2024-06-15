// booking.validation.ts
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    facility: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    payableAmount: z.number().positive().optional(),
    isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']).optional(),
  }),
});

export const cancelBookingSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const validateBookingCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    createBookingSchema.parse(req);
    next();
  } catch (e: any) {
    return res.status(400).json({ success: false, message: e.errors });
  }
};
