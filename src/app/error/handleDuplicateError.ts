import { TErrorSources, TGenericErrorResponse } from '../interface/error';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const regex = /"([^"]*)"/;
  const match = err.message.match(regex);

  const extractedMessage = match && match[1];
  console.log(extractedMessage);
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
