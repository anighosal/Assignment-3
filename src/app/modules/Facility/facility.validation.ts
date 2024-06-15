import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const createFacilitySchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    location: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

export const validateFacilityCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    createFacilitySchema.parse(req);
    next();
  } catch (e: any) {
    return res.status(400).json({ success: false, message: e.errors });
  }
};
