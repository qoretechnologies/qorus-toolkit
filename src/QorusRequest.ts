import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import ErrorInternal from './managers/error/ErrorInternal';
import QorusAuthenticator, { Endpoint } from './QorusAuthenticator';
import { Agent } from 'https';

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

export class QorusRequest {
  /**
   * Default headers for the QorusRequest
   */
  defaultHeaders: AxiosRequestHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  makeRequest = async (
    type: 'GET' | 'PUT' | 'POST' | 'DELETE',
    props: QorusRequestParams,
    endpoint?: Endpoint,
  ): Promise<AxiosResponse | AxiosError | undefined> => {
    const { path, data, headers = this.defaultHeaders, params } = props;
    const selectedEndpoint = endpoint ?? QorusAuthenticator.getSelectedEndpoint();
    if (headers != this.defaultHeaders) {
      Object.assign(headers, { ...this.defaultHeaders, headers });
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

    throw new ErrorInternal('Initialize an endpoint using QorusAuthenticator to use QorusRequest');
  };

  /**
   * -get-function Get request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a get request
   *
   * Returns the promise with the result of the get request
   */
  get = async (props: QorusRequestParams, endpoint?: Endpoint): Promise<AxiosResponse | AxiosError | undefined> => {
    const result = await this.makeRequest('GET', props, endpoint);
    return result;
  };

  /**
   * -post-function Post request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a post request
   *
   * Returns the promise with the result of the post request
   */
  post = async (props: QorusRequestParams, endpoint?: Endpoint): Promise<AxiosResponse | AxiosError | undefined> => {
    const result = await this.makeRequest('POST', props, endpoint);
    return result;
  };

  /**
   * -put-function Put request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a put request
   *
   * Returns the promise with the result of the put request
   */
  put = async (props: QorusRequestParams, endpoint?: Endpoint): Promise<AxiosResponse | AxiosError | undefined> => {
    const result = await this.makeRequest('PUT', props, endpoint);
    return result;
  };

  /**
   * -deleteReq-function Delete request creator for the QorusToolkit
   *
   * @param props {@link QorusRequestParams} endpoint url is mandatory to make a delete request
   *
   * Returns the promise with the result of the delete request
   */
  deleteReq = async (
    props: QorusRequestParams,
    endpoint?: Endpoint,
  ): Promise<AxiosResponse | AxiosError | undefined> => {
    const result = await this.makeRequest('DELETE', props, endpoint);
    return result;
  };
}

export default new QorusRequest();
