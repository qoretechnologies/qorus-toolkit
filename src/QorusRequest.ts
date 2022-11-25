import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import fetch from 'node-fetch';
import ErrorAxios, { ErrorAxiosParams } from './managers/error/ErrorAxios';
import ErrorInternal from './managers/error/ErrorInternal';
import QorusAuthenticator, { Endpoint } from './QorusAuthenticator';
import { isValidStringArray } from './utils';

// export const httpsAgent = new Agent({
//   rejectUnauthorized: false,
// });

// export const httpsAxios = axios.create({ httpsAgent });

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
  defaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  makeRequest = async (
    type: 'GET' | 'PUT' | 'POST' | 'DELETE',
    props: QorusRequestParams,
    endpoint?: Endpoint,
  ): Promise<any> => {
    const { path, data, headers = this.defaultHeaders } = props;
    let selectedEndpoint;
    if (isValidStringArray([endpoint?.url, endpoint?.id])) selectedEndpoint = endpoint;
    else selectedEndpoint = QorusAuthenticator.getSelectedEndpoint();

    if (headers != this.defaultHeaders) {
      Object.assign(headers, { ...this.defaultHeaders, headers });
    }

    if (selectedEndpoint?.url) {
      Object.assign(headers, { ...headers, 'Qorus-Token': selectedEndpoint?.authToken ?? '' });

      const promise = await fetch(`${selectedEndpoint?.url}${path}`, {
        method: type,
        headers: this.defaultHeaders,
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!promise.ok) {
        const text = await promise.text();
        const parsedText = JSON.parse(text);
        throw new ErrorAxios(parsedText as ErrorAxiosParams);
      }

      const json = await promise.json();
      return { data: json };
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
