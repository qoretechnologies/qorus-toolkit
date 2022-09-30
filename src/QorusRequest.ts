import axios, { AxiosPromise, AxiosRequestHeaders } from 'axios';
import { Agent } from 'https';

/**
 * A axios wrapper of https operations
 */
export const httpsAgent = new Agent({
  rejectUnauthorized: false,
});
export const httpsAxios = axios.create({ httpsAgent });

export interface QorusGet {
  headers?: AxiosRequestHeaders;
  endpointUrl: string;
  data?: any;
}

export interface QorusPost {
  headers?: AxiosRequestHeaders;
  endpointUrl: string;
  data?: any;
}

export interface QorusDelete {
  headers?: AxiosRequestHeaders;
  endpointUrl: string;
  data?: any;
}

export interface QorusPut {
  headers?: AxiosRequestHeaders;
  endpointUrl: string;
  data?: any;
}

export interface QorusRequestReturns {
  /**
   * -get-function Get request creator for the QorusToolkit
   * 
   * @param props {@link QorusGet} endpoint url is mandatory to make a get request
   * 
   * Returns the promise with the result of the get request
   */
  get: (props: QorusGet) => Promise<AxiosPromise<any>>;

  /**
  * -post-function Post request creator for the QorusToolkit
  * 
  * @param props {@link QorusPost} endpoint url is mandatory to make a post request
  * 
  * Returns the promise with the result of the post request
  */
  post: (props: QorusPost) => Promise<AxiosPromise<any>>;

  /**
  * -put-function Put request creator for the QorusToolkit
  * 
  * @param props {@link QorusPut} endpoint url is mandatory to make a put request
  * 
  * Returns the promise with the result of the put request
  */
  put: (props: QorusPut) => Promise<AxiosPromise<any>>;

  /**
  * -delete-function Delete request creator for the QorusToolkit
  * 
  * @param props {@link QorusDelete} endpoint url is mandatory to make a delete request
  * 
  * Returns the promise with the result of the delete request
  */
  deleteReq: (props: QorusDelete) => Promise<AxiosPromise<any>>
}

const _QorusRequest = (): QorusRequestReturns => {
  const defaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  const get = async (props: QorusGet): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders } = props;

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

  const post = async (props: QorusPost): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders } = props;

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

  const put = async (props: QorusPut): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders } = props;

    try {
      const promise = await httpsAxios({
        method: 'PUT',
        url: endpointUrl,
        data,
        headers: headers,
      });
      return promise;
    } catch (error: any) {
      return error;
    }
  };

  const deleteReq = async (props: QorusDelete): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders } = props;

    try {
      const promise = await httpsAxios({
        method: 'DELETE',
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
    put,
    deleteReq,
  };
};

export const QorusRequest: QorusRequestReturns = _QorusRequest();
