import { AxiosError } from 'axios';
import BaseError from './Error';
import { errorCodes } from './errorCodes';

class ErrorAxios extends BaseError {
  constructor(error: AxiosError) {
    if (
      typeof error.response === 'undefined' ||
      typeof error.response.data === 'undefined' ||
      typeof (error.response.data as AxiosErrorResponseData).desc === 'undefined'
    ) {
      super(`${error}`, true, errorCodes.INTERNAL.name, undefined);
    } else {
      const response = error.response;
      const data = response?.data as AxiosErrorResponseData;
      super(data.desc, true, data.err, response?.status);
    }
  }
}

interface AxiosErrorResponseData {
  desc: string;
  err: string;
}

export default ErrorAxios;
