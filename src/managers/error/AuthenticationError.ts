import BaseError from './Error';
import { errorCodes } from './errorCodes';

class AuthenticationError extends BaseError {
  constructor(
    description: string,
    isOperational = true,
    name = errorCodes.AUTHENTICATION.name,
    statusCode = errorCodes.AUTHENTICATION.code,
  ) {
    super(description, isOperational, name, statusCode);
  }
}

export default AuthenticationError;
