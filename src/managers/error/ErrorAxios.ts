import BaseError from './Error';
import { errorCodes } from './errorCodes';

class ErrorAxios extends BaseError {
  constructor(error: any) {
    if (typeof error.desc === 'undefined') {
      super(`${JSON.stringify(error)}`, true, errorCodes.INTERNAL.name, undefined);
    } else {
      super(error.desc, true, error.err, error.status);
    }
  }
}

export default ErrorAxios;
