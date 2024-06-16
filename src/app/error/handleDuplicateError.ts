import { TErrorSources, TGenericErrorResponse } from '../interface/error';

interface IDuplicateError extends Error {
  message: string;
}

export const handleDuplicateError = (
  err: IDuplicateError,
): TGenericErrorResponse => {
  const regex = /"([^"]*)"/;
  const match = err.message.match(regex);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: ' ',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'invalid id',
    errorSources,
  };
};

export default handleDuplicateError;
