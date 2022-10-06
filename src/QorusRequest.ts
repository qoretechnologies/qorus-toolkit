import axios, { AxiosPromise, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Agent } from 'https';

/**
 * A axios wrapper of https operations
 */
export const httpsAgent = new Agent({
  rejectUnauthorized: false,
});
export const httpsAxios = axios.create({ httpsAgent });

export interface QorusRequestParams {
  /**
   * Headers for the request
   */
  headers?: AxiosRequestHeaders;

  /**
   * Complete endpoint url for the request
   */
  endpointUrl: string;

  /**
   * Data for the request
   */
  data?: any;

  /**
   * URL Parameters for the request
   */
  params?: AxiosRequestConfig<any>;
}

export interface Request {
  /**
   * -get-function Get request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a get request
   *
   * Returns the promise with the result of the get request
   */
  get: (props: QorusRequestParams) => Promise<AxiosPromise<any>>;

  /**
   * -post-function Post request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a post request
   *
   * Returns the promise with the result of the post request
   */
  post: (props: QorusRequestParams) => Promise<AxiosPromise<any>>;

  /**
   * -put-function Put request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a put request
   *
   * Returns the promise with the result of the put request
   */
  put: (props: QorusRequestParams) => Promise<AxiosPromise<any>>;

  /**
   * -deleteReq-function Delete request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a delete request
   *
   * Returns the promise with the result of the delete request
   */
  deleteReq: (props: QorusRequestParams) => Promise<AxiosPromise<any>>;
}

const _QorusRequest = (): Request => {
  const defaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  /**
   * Get request creator for the QorusToolkit
   */
  const get = async (props: QorusRequestParams): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders, params } = props;

    try {
      const promise = await httpsAxios({
        method: 'GET',
        url: endpointUrl,
        data: data,
        headers: headers,
        params: params,
      });
      return promise;
    } catch (error: any) {
      return error;
    }
  };

  /**
   * Post request creator for the QorusToolkit
   */
  const post = async (props: QorusRequestParams): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders, params } = props;
    try {
      const promise = await httpsAxios({
        method: 'POST',
        url: endpointUrl,
        data,
        headers: headers,
        params: params,
      });
      return promise;
    } catch (error: any) {
      return error;
    }
  };

  /**
   * Put request creator for the QorusToolkit
   */
  const put = async (props: QorusRequestParams): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders, params } = props;

    try {
      const promise = await httpsAxios({
        method: 'PUT',
        url: endpointUrl,
        data,
        headers: headers,
        params: params,
      });
      return promise;
    } catch (error: any) {
      return error;
    }
  };

  /**
   * Delete request creator for the QorusToolkit
   */
  const deleteReq = async (props: QorusRequestParams): Promise<AxiosPromise<any>> => {
    const { endpointUrl, data, headers = defaultHeaders, params } = props;

    try {
      const promise = await httpsAxios({
        method: 'DELETE',
        url: endpointUrl,
        data,
        headers: headers,
        params: params,
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

export const QorusRequest: Request = _QorusRequest();
