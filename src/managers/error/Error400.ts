import BaseError from './Error';
import { errorCodes } from './httpStatusCode';

class Error400 extends BaseError {
  constructor(
    description,
    isOperational = true,
    name = errorCodes.BAD_REQUEST.name,
    statusCode = errorCodes.BAD_REQUEST.code,
  ) {
    super(description, isOperational, name, statusCode);
  }
}

export default Error400;
