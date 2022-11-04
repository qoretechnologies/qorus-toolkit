import axios, { AxiosPromise, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { Agent } from 'https';
import logger from './managers/logger';
import { QorusAuthenticator } from './QorusAuthenticator';

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
  path: string;

  /**
   * Data for the request
   */
  data?: any;

  /**
   * URL Parameters for the request
   */
  params?: {
    [x: string]: string | number | boolean;
  };
}

export interface Request {
  /**
   * -get-function Get request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a get request
   *
   * Returns the promise with the result of the get request
   */
  get: (props: QorusRequestParams) => Promise<AxiosPromise<any> | undefined>;

  /**
   * -post-function Post request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a post request
   *
   * Returns the promise with the result of the post request
   */
  post: (props: QorusRequestParams) => Promise<AxiosPromise<any> | undefined>;

  /**
   * -put-function Put request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a put request
   *
   * Returns the promise with the result of the put request
   */
  put: (props: QorusRequestParams) => Promise<AxiosPromise<any> | undefined>;

  /**
   * -deleteReq-function Delete request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a delete request
   *
   * Returns the promise with the result of the delete request
   */
  delete: (props: QorusRequestParams) => Promise<AxiosPromise<any> | undefined>;

  /**
   * Default headers for the QorusRequest
   */
  defaultHeaders: AxiosRequestHeaders;
}

const _QorusRequest = (): Request => {
  const defaultHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  const makeRequest = async (type: 'GET' | 'PUT' | 'POST' | 'DELETE', props: QorusRequestParams) => {
    const { path, data, headers = defaultHeaders, params } = props;
    const selectedEndpoint = QorusAuthenticator.getSelectedEndpoint();
    if (headers != defaultHeaders) {
      console.log('this is selected Endpoint', selectedEndpoint);
      Object.assign(headers, { ...defaultHeaders, headers });
    }

    if (selectedEndpoint?.url) {
      Object.assign(headers, { ...headers, 'Qorus-Token': selectedEndpoint?.authToken ?? '' });

      try {
        const promise = await httpsAxios({
          method: type,
          url: selectedEndpoint?.url + path,
          data: data,
          headers: headers,
          params: params,
        });
        return promise;
      } catch (error: any) {
        return error;
      }
    }

    logger.error('Initialize an endpoint using QorusAuthenticator to use QorusRequest');
    return;
  };

  /**
   * Get request creator for the QorusToolkit
   */
  const get = async (props: QorusRequestParams): Promise<AxiosPromise<any> | undefined> => {
    const result = await makeRequest('GET', props);
    return result;
  };

  /**
   * Post request creator for the QorusToolkit
   */
  const post = async (props: QorusRequestParams): Promise<AxiosPromise<any> | undefined> => {
    const result = await makeRequest('POST', props);
    return result;
  };

  /**
   * Put request creator for the QorusToolkit
   */
  const put = async (props: QorusRequestParams): Promise<AxiosPromise<any> | undefined> => {
    const result = await makeRequest('PUT', props);
    return result;
  };

  /**
   * Delete request creator for the QorusToolkit
   */
  const deleteReq = async (props: QorusRequestParams): Promise<AxiosPromise<any> | undefined> => {
    const result = await makeRequest('DELETE', props);
    return result;
  };

  return {
    get,
    post,
    put,
    delete: deleteReq,
    defaultHeaders,
  };
};

export const QorusRequest: Request = _QorusRequest();
