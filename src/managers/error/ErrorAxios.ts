import { AxiosError } from 'axios';
import BaseError from './Error';

class ErrorAxios extends BaseError {
  constructor(error: AxiosError) {
    const response = error.response;
    const data = response?.data as AxiosErrorResponseData;
    if (response?.data) data.desc ?? '';

    super(data.desc, true, data.err, response?.status);
  }
}

interface AxiosErrorResponseData {
  desc: string;
  err: string;
}

export default ErrorAxios;
