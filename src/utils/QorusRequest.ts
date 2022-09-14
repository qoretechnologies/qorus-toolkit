import axios, { AxiosPromise } from 'axios';
import { Agent } from 'https';

/**
 * A axios wrapper of https operations
 */
export const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

export interface AxiosGet {
  endpointUrl: string;
  data?: any;
}

export interface AxiosPost {
  endpointUrl: string;
  data?: any;
}

export interface AxiosRequest {
  get: (props: AxiosGet) => Promise<AxiosPromise<any>>;
  post: (props: AxiosPost) => Promise<AxiosPromise<any>>;
}

const QorusRequest = (): AxiosRequest => {
  const httpsAxios = axios.create({ httpsAgent });
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

  const get = async (props: AxiosGet): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data } = props;

    try {
      const promise = await httpsAxios({
        method: 'GET',
        url: endpointUrl,
        data: data,
        headers: headers,
      });
      return promise;
    } catch (error: any) {
      return error;
    }
  };

  const post = async (props: AxiosPost): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data } = props;

    try {
      const promise = await httpsAxios({
        method: 'POST',
        url: endpointUrl,
        data,
        headers: headers,
      });
      return promise;
    } catch (error: any) {
      return error;
    }
  };

  return {
    get,
    post,
  };
};

export default QorusRequest;
export const QorusReq = QorusRequest();
