import BaseError from './Error';
import { errorCodes } from './httpStatusCode';

class ErrorGeneral extends BaseError {
  constructor(description, name = errorCodes.GENERAL.name, statusCode = errorCodes.GENERAL.code, isOperational = true) {
    super(description, isOperational, name, statusCode);
  }
}

export default ErrorGeneral;
