import { AxiosError, AxiosResponse } from 'axios';
import logger from './managers/logger';
import { QorusRequest } from './QorusRequest';
import { apiPathsInitial } from './utils/apiPaths';

export interface Provider {
  /**
   * -getRecord-function Get record of Data Providers with context 'record' from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getRecord: () => Promise<ProviderWithOptions>;

  /**
   * -getApi-function Get record of Data Providers with context 'api'  from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getApi: () => Promise<ProviderWithOptions>;

  /**
   * -getEvent-function Get record of Data Providers with context 'event'  from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getEvent: () => Promise<ProviderWithOptions>;

  /**
   * -getMessage-function Get record of Data Providers with context 'message'  from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getMessage: () => Promise<ProviderWithOptions>;

  /**
   * -getType-function Get record of Data Providers with context 'type'  from /dataprovider/browse endpoint
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
    const error = result as unknown as AxiosError;

    if (error.code) {
      logger.error(
        `Failed to browse the data provider with context: ${context}, error: ${JSON.stringify(error.response?.data)}`,
      );
    }

    const providerResponse = response?.data;
    const responseError = error.response?.data;

    return new ProviderWithOptions(initialPath, providerResponse, context, providerResponse, responseError);
  };

  // Fetch DataProvider with context record
  const getRecord = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('record');
  };

  // Fetch DataProvider with with context api
  const getApi = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('api');
  };

  // Fetch DataProvider with with context event
  const getEvent = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('event');
  };

  // Fetch DataProvider with with context message
  const getMessage = async (): Promise<ProviderWithOptions> => {
    return fetchWithContext('message');
  };

  // Fetch DataProvider with with context type
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

/**
 * fetchProvider creates a put request to the QorusServer with context and also adds the
 * functionality to select the next children from dataprovider response list
 *
 * @param obj previous parent object
 * @param context context parameter for the request
 * @param select next provider to be selected, chosen from the parent's children list
 * @param providerOptions constructor options for the dataprovider to be selected next
 * @returns ProviderWithOptions object
 */
const fetchProvider = async (obj: ProviderWithOptions, context: Context, select?: string, providerOptions?: any) => {
  const children = obj.getChildren();
  let _path = obj.getPath();

  if (select) {
    if (_path[_path.length - 1] !== select) {
      _path.push(select);
    }
  }

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

export type ConstructorOptions = any;
export type ResponseData = any;
export type ResponseError = any;
export type ProviderData = any;

/**
 * Class to manage data provider options
 */
export class ProviderWithOptions {
  // Array of request path, contains request path to the current provider
  private path: string[] = [''];

  // Response data containing children, received after fetching the current provider
  private responseData: ResponseData = {};

  // Context for the current provider
  private context: Context;

  // Contains required properties for the current provider, including constructor_options
  private providerData: ProviderData = {};

  // Error response received after making a request to the current provider
  private responseError: ResponseError = {};

  constructor(
    path: string[],
    responseData: ResponseData,
    context: Context,
    providerData?: ProviderData,
    responseError?: ResponseError,
  ) {
    this.path = path;
    this.responseData = responseData;
    this.context = context;
    this.providerData = providerData;
    this.responseError = responseError;
  }

  /**
   * Checks if the children exist on the provider
   * @param name Name of the children you want to find
   * @returns true if the children exist, false otherwise
   */
  hasChildren(name: string) {
    const children = this.responseData?.children.find((child) => child.name === name);
    if (typeof children === 'undefined' || !children.name) return false;
    else return true;
  }

  /**
   * A getter to the the stored path array for the current provider
   * @returns path array
   */
  getPath() {
    return this.path;
  }

  /**
   * A getter to get request path for the current provider
   *
   * @param path Optional path array to generate request path
   * @returns
   */
  getPathString(path?: string[]) {
    return getRequestPath(path ? path : this.path);
  }

  /**
   * Setter to set path for the current provider
   * @param path array of path strings to replace for path of the current provider
   */
  setPath(path: string[]) {
    this.path = path;
  }

  /**
   * A getter to get available data for the current provider
   * @returns responseData, providerData and errorData for the current provider
   */
  getData() {
    return { responseData: this.responseData, providerData: this.providerData, errorData: this.responseError };
  }

  private setData(responseData: ResponseData, providerData: ProviderData) {
    this.responseData = responseData;
    this.providerData = providerData;
  }

  /**
   * A getter to get the context for the current provider
   * @returns context string
   */
  getContext() {
    return this.context;
  }

  /**
   * Method to verify if the current provider has children
   * @returns true if the children exist, false otherwise
   */
  hasData() {
    if (this.responseData.matches_context) return true;
    else return false;
  }

  /**
   * A getter to get available children for the current provider
   * @returns a list of children
   */
  getChildren() {
    return this.responseData?.children;
  }

  /**
   * A getter to get children names for the current provider
   * @returns list of children names
   */
  getChildrenNames() {
    const children = this.getChildren();
    let names: any = {};
    children?.forEach((child) => (names[child.name] = child.name));

    return names;
  }

  /**
   * Method to select the next children from the current provider for further operations
   * @param select next children to be selected
   * @param providerOptions constructor options for the next children
   * @returns {@link ProviderWithOptions} new object
   */
  async get(select?: string, providerOptions?: ConstructorOptions) {
    if (!select) return this;

    const childData = await fetchProvider(this, this.context, select, providerOptions);
    return childData;
  }
}
