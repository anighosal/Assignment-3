import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../error/appError';

import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleValidationError from '../error/handleValidationError';
import { handleZodError } from '../error/handleZodError';
import { TErrorSources } from '../interface/error';
import BookingError from '../modules/Booking/customBookingError';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || 'Validation error';
    errorSources = simplifiedError?.errorSources || [];
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || 'Validation error';
    errorSources = simplifiedError?.errorSources || [];
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message || 'Cast error';
    errorSources = simplifiedError?.errorSources || [];
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode || 409; // Conflict status code for duplicate entry
    message = simplifiedError?.message || 'Duplicate key error';
    errorSources = simplifiedError?.errorSources || [];
  } else if (err instanceof BookingError) {
    statusCode = err?.statusCode || 400;
    message = err.message || 'Booking error';
    errorSources = [{ path: '', message: err?.message || 'Booking error' }];
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode || 500;
    message = err.message || 'Application error';
    errorSources = [{ path: '', message: err?.message || 'Application error' }];
  } else if (err instanceof Error) {
    message = err.message || 'Unknown error';
    errorSources = [{ path: '', message: err?.message || 'Unknown error' }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_dev === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
