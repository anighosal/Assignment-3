class BookingError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'BookingError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BookingError;
