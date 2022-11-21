import BaseError from './Error';
import { errorCodes } from './httpStatusCode';

class Error404 extends BaseError {
  constructor(
    description: string,
    isOperational = true,
    name = errorCodes.NOT_FOUND.name,
    statusCode = errorCodes.NOT_FOUND.code,
  ) {
    super(description, isOperational, name, statusCode);
  }
}

export default Error404;
