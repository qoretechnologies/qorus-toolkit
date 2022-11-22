import BaseError from './Error';
import { errorCodes } from './errorCodes';

class ErrorInternal extends BaseError {
  constructor(
    description: string,
    name = errorCodes.INTERNAL.name,
    statusCode = errorCodes.INTERNAL.code,
    isOperational = true,
  ) {
    super(description, isOperational, name, statusCode);
  }
}

export default ErrorInternal;
