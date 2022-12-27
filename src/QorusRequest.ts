import { AxiosRequestHeaders } from 'axios';
import fetch from 'node-fetch';
import ErrorAxios, { ErrorAxiosParams } from './managers/error/ErrorAxios';
import ErrorInternal from './managers/error/ErrorInternal';
import QorusAuthenticator, { Endpoint } from './QorusAuthenticator';
import { isValidStringArray } from './utils';

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
  params?: Record<string, string>;
}

export interface DefaultHeaders {
  [x: string]: string;
}

export class QorusRequest {
  /**
   * Default headers for the QorusRequest
   */
  defaultHeaders: DefaultHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' };

  private makeRequest = async (
    type: 'GET' | 'PUT' | 'POST' | 'DELETE',
    props: QorusRequestParams,
    endpoint?: Endpoint,
  ): Promise<any> => {
    const { path, data, headers = this.defaultHeaders, params } = props;
    let selectedEndpoint;

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
        fetchUrl = `${selectedEndpoint.url}${path}?${requestParams}`;
      } else fetchUrl = `${selectedEndpoint.url}${path}`;

      const promise = await fetch(fetchUrl, {
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
   * Get request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a get request
   * @returns Result of the get request
   */
  async get<T>(props: QorusRequestParams, endpoint?: Endpoint): Promise<T | undefined> {
    const result = await this.makeRequest('GET', props, endpoint);
    return result;
  }

  /**
   * Post request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a post request
   * @returns Result of the post request
   */
  async post<T>(props: QorusRequestParams, endpoint?: Endpoint): Promise<T | undefined> {
    const result = await this.makeRequest('POST', props, endpoint);
    return result;
  }

  /**
   * Put request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a put request
   * @returns Result of the put request
   */
  async put<T>(props: QorusRequestParams, endpoint?: Endpoint): Promise<T | undefined> {
    const result = await this.makeRequest('PUT', props, endpoint);
    return result;
  }

  /**
   * Delete request creator for the QorusToolkit
   * @param props QorusRequestParams endpoint url is mandatory to make a delete request
   * @returns Result of the delete request
   */
  async deleteReq<T>(props: QorusRequestParams, endpoint?: Endpoint): Promise<T | undefined> {
    const result = await this.makeRequest('DELETE', props, endpoint);
    return result;
  }
}

export default new QorusRequest();
