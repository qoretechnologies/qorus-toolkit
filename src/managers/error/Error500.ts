import BaseError from './Error';
import { errorCodes } from './errorCodes';

class Error400 extends BaseError {
  constructor(
    description: string,
    isOperational = true,
    name = errorCodes.INTERNAL_SERVER.name,
    statusCode = errorCodes.INTERNAL_SERVER.code,
  ) {
    super(description, isOperational, name, statusCode);
  }
}

export default Error400;
