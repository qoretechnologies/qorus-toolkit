import { AxiosError, AxiosResponse } from 'axios';
import logger from './managers/logger';
import { QorusRequest } from './QorusRequest';
import { apiPathsInitial } from './utils/apiPaths';

export interface Provider {
  /**
   * -getRecord-function Get record of Data Providers from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getRecord: () => Promise<ProviderWithOptions>;

  /**
   * -getApi-function Get record of Data Providers from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getApi: () => Promise<ProviderWithOptions>;
  /**
   * -getEvent-function Get record of Data Providers from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getEvent: () => Promise<ProviderWithOptions>;
  /**
   * -getMessage-function Get record of Data Providers from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getMessage: () => Promise<ProviderWithOptions>;
  /**
   * -getType-function Get record of Data Providers from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getType: () => Promise<ProviderWithOptions>;
}

export interface ProviderOptions {
  initialPath: string[];
  dataObj: {
    [x: string]: string | number | boolean | any[];
  };
}

const getRequestPath = (path: string[]) => {
  let requestPath = '';
  path.forEach((pth) => {
    requestPath = requestPath + pth + '/';
  });
  return requestPath;
};

const _DataProvider = (): Provider => {
  /*eslint-disable*/

  const initialPath: string[] = [apiPathsInitial.dataProviders.browse];

  const fetchWithContext = async (context: Context) => {
    // Making a put request
    const requestPath = getRequestPath(initialPath);
    const requestData = { context: context };

    const result = await QorusRequest.put({
      path: requestPath,
      data: requestData,
    });

    const response = result as AxiosResponse;
    const error = result as AxiosError;

    if (error.code) {
      logger.error(
        `Failed to browse the data provider with context: ${context}, error: ${JSON.stringify(error.response?.data)}`,
      );
    }

    const providerResponse = response?.data;
    const responseError = error.response?.data;

    return new ProviderWithOptions(initialPath, providerResponse, context, providerResponse, responseError);
  };

  // Put DataProvider request with context record
  const getRecord = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('record');
  };

  // Put DataProvider request with context api
  const getApi = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('api');
  };

  // Put DataProvider request with context event
  const getEvent = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('event');
  };

  // Put DataProvider request with context message
  const getMessage = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('message');
  };

  // Put DataProvider request with context type
  const getType = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('type');
  };

  return {
    getRecord,
    getType,
    getEvent,
    getApi,
    getMessage,
  };
};

export const QorusDataProvider: Provider = _DataProvider();

type Context = 'record' | 'api' | 'event' | 'message' | 'type' | undefined;

const fetchProvider = async (obj: ProviderWithOptions, context: Context, select?: string, providerOptions?: any) => {
  const children = obj.getChildren();
  let _path = obj.getPath();

  if (select) {
    if (_path[_path.length - 1] !== select) {
      _path.push(select);
    }
  }
  console.log('path is = ', _path);
  const requestPath = getRequestPath(_path);
  const requestData = { context: context, provider_options: providerOptions ?? {} };
  // Making a put request
  const result = await QorusRequest.put({
    path: requestPath,
    data: requestData,
  });

  const response = result as AxiosResponse;
  const error = result as AxiosError;

  if (error.code) {
    logger.error('Request is not valid, please verify provided data and providerOptions fields.');
  }
  const providerData = children?.filter((object) => object.name === select);
  const providerResponse = response?.data;
  const responseError = error.response?.data;

  return new ProviderWithOptions(_path, providerResponse, context, providerData, responseError);
};

type ConstructorOptions = any;

class ProviderWithOptions {
  private path: string[] = [''];
  private responseData: any = {};
  private context: Context;
  private providerData: any = {};
  private responseError: any = {};

  constructor(path: string[], responseData: any, context: Context, providerData?: any, responseError?: any) {
    this.path = path;
    this.responseData = responseData;
    this.context = context;
    this.providerData = providerData;
    this.responseError = responseError;
  }

  getPath() {
    return this.path;
  }

  setPath(path: string[]) {
    this.path = path;
  }

  getData() {
    return { responseData: this.responseData, providerData: this.providerData };
  }

  private setData(responseData: any, providerData: any) {
    this.responseData = responseData;
    this.providerData = providerData;
  }

  getContext() {
    return this.context;
  }

  hasData() {
    if (this.responseData.matches_context) return true;
    else return false;
  }

  getChildren() {
    return this.responseData.children;
  }

  async get(select?: string, providerOptions?: ConstructorOptions) {
    if (!select) return this;

    const childData = await fetchProvider(this, this.context, select, providerOptions);
    return childData;
  }
}
