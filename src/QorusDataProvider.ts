import { AxiosError, AxiosResponse } from 'axios';
import logger from './managers/logger';
import { QorusOptions } from './QorusOptions';
import QorusRequest from './QorusRequest';
import { apiPathsInitial } from './utils/apiPaths';

const getRequestPath = (path: string[]) => {
  let requestPath = '';
  path.forEach((pth) => {
    requestPath = requestPath + pth + '/';
  });
  return requestPath;
};

export type Context = 'record' | 'api' | 'event' | 'message' | 'type' | undefined;

export type ConstructorOptions = any;
export type ResponseData = any;
export type ResponseError = any;
export type ProviderData = any;
/*eslint-disable */
/**
 * fetchProvider creates a put request to the QorusServer with context and also adds the
 * functionality to select the next children from dataprovider response list
 *
 * @param obj previous parent object
 * @param context context parameter for the request
 * @param select next provider to be selected, chosen from the parent's children list
 * @param QorusDataProvider constructor options for the dataprovider to be selected next
 *
 * Returns ProviderWithOptions object
 */
const fetchProvider = async (obj: QorusDataProvider, context: Context, select?: string, providerOptions?: any) => {
  const children = obj.getChildren();
  let _path = obj.getPath();

  if (select && _path) {
    if (_path[_path.length - 1] !== select) {
      _path.push(select);
    }
  }

  const requestPath = getRequestPath(_path!);
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

  return new QorusDataProvider({ path: _path!, responseData: providerResponse, context, providerData, responseError });
};

export class QorusDataProvider {
  path?: string[] = [];
  responseData: ResponseData;
  context: Context;
  providerData?: ProviderData;
  responseError?: ResponseError;

  constructor(options?: {
    path: string[];
    responseData: ResponseData;
    context: Context;
    providerData?: ProviderData;
    responseError?: ResponseError;
  }) {
    if (options) {
      this.path = options.path;
      this.responseData = options.responseData;
      this.context = options.context;
      this.providerData = options.providerData;
      this.responseError = options.responseError;
    }
  }

  private fetchWithContext = async (context: Context) => {
    // Making a put request
    const requestPath = getRequestPath([apiPathsInitial.dataProviders.browse]);
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

    const responseData = response?.data;
    const responseError = error.response?.data;

    return new QorusDataProvider({
      path: [apiPathsInitial.dataProviders.browse],
      responseData: responseData,
      context,
      providerData: responseData,
      responseError,
    });
  };

  /**
   * -getRecord-function Get record of Data Providers with context 'record' from /dataprovider/browse endpoint
   *
   * Returns array of records
   */
  getRecord = async (): Promise<QorusDataProvider> => {
    return this.fetchWithContext('record');
  };

  /**
   * -getApi-function Get record of Data Providers with context 'api'  from /dataprovider/browse endpoint
   *
   * Returns array of records
   */

  getApi = async (): Promise<QorusDataProvider> => {
    return this.fetchWithContext('api');
  };

  /**
   * -getEvent-function Get record of Data Providers with context 'Event'  from /dataprovider/browse endpoint
   *
   * Returns array of records
   */
  getEvent = async (): Promise<QorusDataProvider> => {
    return this.fetchWithContext('event');
  };

  /**
   * -getEvent-function Get record of Data Providers with context 'message'  from /dataprovider/browse endpoint
   *
   * Returns array of records
   */
  getMessage = async (): Promise<QorusDataProvider> => {
    return this.fetchWithContext('message');
  };

  /**
   * -getEvent-function Get record of Data Providers with context 'type'  from /dataprovider/browse endpoint
   *
   * Returns array of records
   */
  getType = async (): Promise<QorusDataProvider> => {
    return this.fetchWithContext('type');
  };

  /**
   * -has-function Checks if the children exist on the provider
   * @param name Name of the children you want to find
   * @returns true if the children exist, false otherwise
   */
  has(name: string) {
    const children = this.responseData?.children.find((child) => child.name === name);
    if (typeof children === 'undefined' || !children.name) return false;
    else return true;
  }

  /**
   * A getter to the the stored path array for the current provider
   *
   * Returns path array
   */
  getPath() {
    return this.path;
  }

  /**
   * A getter to get request path for the current provider
   *
   * @param path Optional path array to generate request path
   *
   * Returns request path string
   */
  getFinalPath(path?: string[]) {
    return getRequestPath(path ? path : this.path!);
  }

  /**
   * Setter to set path for the current provider
   * @param path array of path strings to replace for path of the current provider
   *
   */
  setPath(path: string[]) {
    this.path = path;
  }

  /**
   * A getter to get available data for the current provider
   *
   * Returns responseData, providerData and errorData for the current provider
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
   *
   * Returns context string
   */
  getContext() {
    return this.context;
  }

  /**
   * Method to verify if the current provider has children
   *
   * Returns true if the children exist, false otherwise
   */
  hasData() {
    if (this.responseData.matches_context) return true;
    else return false;
  }

  /**
   * A getter to get available children for the current provider
   *
   * Returns a list of children
   */
  getChildren() {
    return this.responseData?.children;
  }

  /**
   * -getChildrenNames-function A getter to get children names for the current provider
   *
   * Returns list of children names
   */
  getChildrenNames() {
    /*eslint-disable */
    const children = this.getChildren();
    let names: any = {};
    children?.forEach((child) => (names[child.name] = child.name));

    return names;
  }

  /**
   * A getter to get options by name for a children provider
   * @param childrenName name of the children provider
   * Returns QorusOptions object
   */
  getOptions(childrenName: string): QorusOptions | undefined {
    const children = this.getChildren();
    const filteredChildren = children?.filter((child) => child.name === childrenName);

    if (!filteredChildren[0]) {
      logger.error(`Children for the provider "${childrenName}" does not exist, please verify if the provider exist`);
      return;
    }
    return new QorusOptions(filteredChildren[0]);
  }

  /**
   * A getter to get options by name for a children provider
   * Returns QorusOptions object array
   */
  getAllOptions(): QorusOptions[] {
    const children = this.getChildren();
    let allOptions: any[] = [];
    children.forEach((child) => {
      const option = new QorusOptions(child);
      allOptions.push(option);
    });
    return allOptions;
  }

  /**
   * -getProvider-function Method to select the next children from the current provider for further operations
   * @param select next children to be selected
   * @param QorusDataProvider constructor options for the next children
   *
   * Returns {@link QorusDataProvider} new object
   */
  async get(select?: string, providerOptions?: ProviderData) {
    if (!select) return this;

    const childData = await fetchProvider(this, this.context, select, providerOptions);
    return childData;
  }
}

export default new QorusDataProvider();
