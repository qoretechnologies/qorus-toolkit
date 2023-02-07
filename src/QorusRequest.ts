import fetch from 'node-fetch';
import ErrorInternal from './managers/error/ErrorInternal';
import ErrorQorusRequest, { IErrorQorusRequestParams } from './managers/error/ErrorQorusRequest';
import QorusAuthenticator, { IEndpoint } from './QorusAuthenticator';
import { isValidStringArray } from './utils';

export type TQorusRequestHeader = Record<string, string | number | boolean>;

export interface IQorusRequestResponse<T = any> {
  /**Response data from an api call*/
  data: T;
  /**Response status from an api call */
  status: number;
  /** Response status text from an api call*/
  statusText: string;
  /** Response Headers */
  headers: TQorusRequestHeader;
  /** Response config parameter of a api call */
  config: Record<string, any>;
  /** Request type of the api call */
  request?: any;
}

export interface IQorusRequestParams {
  /**
   * Headers to include in an https request to Qorus server api
   */
  headers?: TQorusRequestHeader;

  /**
   * Path for a https request to Qorus server
   */
  path: string;

  /**
   * Data to include in an https request to Qorus server api
   */
  data?: any;

  /**
   * URL Parameters to include in an https request to Qorus server api
   */
  params?: Record<string, string>;
}

export interface IDefaultHeaders {
  /**
   * Content type for the Qorus request
   */
  'Content-Type': string;

  /**
   * Accepted data format type by Qorus server
   */
  Accept: string;

  /**
   * Any record with type string
   */
  [x: string]: string;
}

/**
 * QorusRequest class is wrapper for https request to Qorus server apis
 * - Adds default headers to the https request
 * - Allows creation of request parameters from a js object
 * - Allows custom headers and data object
 * @returns QorusRequest class object
 * @Category QorusRequest
 */
export class QorusRequest {
  /**
   * Default headers for the QorusRequest
   */
  defaultHeaders: IDefaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  private makeRequest = async (
    type: 'GET' | 'PUT' | 'POST' | 'DELETE',
    props: IQorusRequestParams,
    endpoint?: IEndpoint,
  ): Promise<any> => {
    const { path, data, headers = this.defaultHeaders, params } = props;
    let selectedEndpoint: IEndpoint | undefined;

    if (isValidStringArray([endpoint?.url, endpoint?.endpointId])) {
      selectedEndpoint = endpoint;
    } else {
      selectedEndpoint = QorusAuthenticator.getSelectedEndpoint();
    }

    if (headers != this.defaultHeaders) {
      Object.assign(headers, { ...this.defaultHeaders, headers });
    }

    if (selectedEndpoint?.url) {
      Object.assign(headers, { ...headers, 'Qorus-Token': selectedEndpoint?.authToken ?? '' });

      const requestParams = new URLSearchParams(params).toString();
      let fetchUrl: string;
      if (requestParams.length) {
        fetchUrl = `${selectedEndpoint?.url}${path}?${requestParams}`;
      } else fetchUrl = `${selectedEndpoint?.url}${path}`;

      const promise = await fetch(fetchUrl, {
        method: type,
        headers: this.defaultHeaders,
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!promise.ok) {
        const text = await promise.text();
        const parsedText = JSON.parse(text);
        throw new ErrorQorusRequest(parsedText as IErrorQorusRequestParams);
      }

      const json = await promise.json();
      return { data: json };
    }

    throw new ErrorInternal('Initialize an endpoint using QorusAuthenticator to use QorusRequest');
  };

  /**
   * Get request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a get request
   * @returns Result of the get request
   */
  async get<T>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T | undefined> {
    const result = await this.makeRequest('GET', props, endpoint);
    return result;
  }

  /**
   * Post request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a post request
   * @returns Result of the post request
   */
  async post<T>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T | undefined> {
    const result = await this.makeRequest('POST', props, endpoint);
    return result;
  }

  /**
   * Put request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a put request
   * @returns Result of the put request
   */
  async put<T>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T | undefined> {
    const result = await this.makeRequest('PUT', props, endpoint);
    return result;
  }

  /**
   * Delete request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a delete request
   * @returns Result of the delete request
   */
  async deleteReq<T>(props: IQorusRequestParams, endpoint?: IEndpoint): Promise<T | undefined> {
    const result = await this.makeRequest('DELETE', props, endpoint);
    return result;
  }
}

export default new QorusRequest();
