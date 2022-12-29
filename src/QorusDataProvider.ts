import { AxiosResponse } from 'axios';
import ErrorAxios, { ErrorAxiosParams } from './managers/error/ErrorAxios';
import logger from './managers/logger';
import { QorusOptions } from './QorusOptions';
import QorusRequest from './QorusRequest';
import { apiPathsInitial } from './utils/apiPaths';

/**
 * A getter to join the array of path strings to the current DataProvider
 * @param path Array of path string to the current DataProvider
 * @returns Joined path string from the array of paths
 */
function getRequestPath(path: string[]) {
  let requestPath = '';
  path.forEach((pth) => {
    requestPath = requestPath + pth + '/';
  });
  return requestPath;
}

/**
 * QorusDataProvider class provides methods to interact with Qorus DataProvider api
 * - Fetch DataProvider from a Qorus server endpoint
 * - Access DataProvider constructor_options with supported operations: get, set, fetch
 * - Provides validation for the values of DataProvider constructor_options properties
 * @returns QorusDataProvider class object
 * @Category QorusDataProvider
 */
export class QorusDataProvider {
  /** Array of path strings, linking to the current provider path extension */
  path?: string[] = [];

  /** Get Request response data for a data provider  */
  responseData?: DataProviderResponseData;

  /** Current context for the data provider */
  context: Context = 'api';

  /** Get Request error data if error received */
  responseError?: ResponseError;

  raw;

  constructor(options?: QorusDataProviderConstructorOptions) {
    this.raw = options;
    if (options) {
      this.path = options.path;
      this.responseData = options.responseData;
      this.context = options.context;
      this.responseError = options.responseError;
    }
  }

  getDataProviderObject() {
    return this;
  }

  private async fetchWithContext(context: Context) {
    // Making a put request
    const requestPath = getRequestPath([apiPathsInitial.dataProviders.browse]);
    const requestData = { context: context };

    const result = await QorusRequest.put({
      path: requestPath,
      data: requestData,
    });

    const response = result as AxiosResponse;
    const error = result as ErrorAxiosParams;

    if (error.status) {
      throw new ErrorAxios(error);
    }

    const responseData = response?.data as DataProviderResponseData;
    const responseError = error.desc;

    return new QorusDataProvider({
      path: [apiPathsInitial.dataProviders.browse],
      responseData: responseData,
      context,
      responseError,
    });
  }

  /**
   * Get record of Data Providers with context 'record' from /dataprovider/browse endpoint
   * @returns A new DataProvider object with response from browse api as context record
   */
  async getRecord(): Promise<QorusDataProvider> {
    return this.fetchWithContext('record');
  }

  /**
   * Get record of Data Providers with context 'api'  from /dataprovider/browse endpoint
   * @returns A new DataProvider object with response from browse api as context api
   */

  async getApi(): Promise<QorusDataProvider> {
    return this.fetchWithContext('api');
  }

  /**
   * Get record of Data Providers with context 'Event'  from /dataprovider/browse endpoint
   * @returns A new DataProvider object with response from browse api as context event
   */
  async getEvent(): Promise<QorusDataProvider> {
    return this.fetchWithContext('event');
  }

  /**
   * Get record of Data Providers with context 'message'  from /dataprovider/browse endpoint
   * @returns A new DataProvider object with response from browse api as context message
   */
  async getMessage(): Promise<QorusDataProvider> {
    return this.fetchWithContext('message');
  }

  /**
   * Get record of Data Providers with context 'type'  from /dataprovider/browse endpoint
   * @returns A new DataProvider object with response from browse api as context type
   */
  async getType(): Promise<QorusDataProvider> {
    return this.fetchWithContext('type');
  }

  /**
   * Checks if the children exist on the provider
   * @param name Name of the children you want to find
   * @returns True if the children exist, False otherwise
   */
  has(name: string): boolean {
    const children = this.responseData?.children.find((child) => child.name === name);
    if (typeof children === 'undefined' || !children.name) return false;
    else return true;
  }

  /**
   * A getter to the the stored path array for the current provider
   * @returns Array of path strings
   */
  getPath(): string[] | undefined {
    return this.path;
  }

  /**
   * A getter to get request path for the current provider
   * @param path Optional path array to generate request path
   * @returns Request path string
   */
  getFinalPath(path?: string[]): string {
    return getRequestPath(path ? path : this.path!);
  }

  /**
   * Setter to set path for the current provider
   * @param path Array of path strings to replace for path of the current provider
   *
   */
  setPath(path: string[]) {
    this.path = path;
  }

  /**
   * A getter to get available data for the current provider
   * @returns responseData and errorData for the current provider
   */
  getData() {
    return { responseData: this.responseData, errorData: this.responseError };
  }

  /**
   * A getter to get the context for the current provider
   * @returns Context for the api ex: "record";
   */
  getContext(): Context {
    return this.context;
  }

  /**
   * Method to verify if the current provider has children
   * @returns true if the children exist, false otherwise
   */
  hasData(): boolean {
    if (this.responseData?.matches_context) return true;
    else return false;
  }

  /**
   * A getter to get available children for the current provider
   * @returns A list of DataProvider children
   */
  getChildren() {
    return this.responseData?.children;
  }

  /**
   * A getter to get children names for the current provider
   * @returns list of children names
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
   * @returns QorusOptions object for the data provider children
   */
  getOptions(childrenName: string): QorusOptions | undefined {
    const children = this.getChildren();
    const filteredChildren = children?.filter((child) => child.name === childrenName);

    if (!filteredChildren || !filteredChildren[0]) {
      logger.error(`Children for the provider "${childrenName}" does not exist, please verify if the provider exist`);
      return;
    }
    return new QorusOptions(filteredChildren[0]);
  }

  /**
   * A getter to get options by name for a children provider
   * @returns QorusOptions object array
   */
  getAllOptions(): QorusOptions[] {
    const children = this.getChildren();
    let allOptions: any[] = [];
    children?.forEach((child) => {
      const option = new QorusOptions(child);
      allOptions.push(option);
    });
    return allOptions;
  }

  /**
   * Method to select the next children from the current provider for further operations
   * @param select next children to be selected
   * @param QorusDataProvider constructor options for the next children
   * @returns {@link QorusDataProvider} new object
   */
  async get(select?: string, providerOptions?: any) {
    if (!select) return this;

    const childData = await fetchProvider(this, this.context, select, providerOptions);
    return childData;
  }
}

/**
 * fetchProvider creates a put request to the QorusServer with context and also adds the
 * functionality to select the next children from dataprovider response list
 * @param obj previous parent object
 * @param context context parameter for the request
 * @param select next provider to be selected, chosen from the parent's children list
 * @param QorusDataProvider constructor options for the dataprovider to be selected next
 * @returns ProviderWithOptions object
 */
const fetchProvider = async (obj: QorusDataProvider, context: Context, select?: string, providerOptions?: any) => {
  const _path = obj.getPath();

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
  const error = result as ErrorAxiosParams;

  if (error.status) {
    throw new ErrorAxios(error);
  }
  const providerResponse = response?.data;
  const responseError = error.desc;

  return new QorusDataProvider({ path: _path!, responseData: providerResponse, context, responseError });
};

export default new QorusDataProvider();

/**
 * Context for the Qorus api ex: 'record'
 */
export type Context = 'record' | 'api' | 'event' | 'message' | 'type';

/** Get request error data from DataProvider api */
export type ResponseError = any;

export interface DataProviderChildren {
  /**
   * Name of the DataProvider children
   */
  name: string;
  /**
   * Description for the DataProvider children
   */
  desc: string;
  /**
   * Constructor options for the DataProvider children
   */
  constructor_options: DataProviderChildrenConstructorOptions;
  /**
   * Type of data provider children ex: "nav"
   */
  type: string;
}

export interface DataProviderChildrenConstructorOptions {
  /**
   * DataProvider children constructor_options property object
   */
  [x: string]: DataProviderChildrenConstructorPropertyOptions;
}
export interface DataProviderChildrenConstructorPropertyOptions {
  /**
   * Accepted types for the DataProvider constructor_options property
   */
  type: string[];

  /**
   * Description of DataProvider constructor_options property
   */
  desc: string;

  /**
   * Verifies if the DataProvider constructor_options property is required
   */
  required: boolean;

  /**
   * Verifies if the DataProvider constructor_options property is sensitive
   */
  sensitive: boolean;

  /**
   * Property value for a DataProvider constructor_options property
   */
  value?: any;

  /**
   * Converted Qorus types to jsTypes
   */
  jsType?: string[] | undefined;

  /**
   * Name of the property from construction_options of DataProvider
   */
  name?: string;
}

export interface DataProviderResponseData {
  /**
   * Type of DataProvider
   */
  type: string;

  /**
   * Array of children from a DataProvider
   */
  children: DataProviderChildren[];

  /**
   * Verifies if DataProvider have further context/children
   */
  matches_context: boolean;
}

export interface QorusDataProviderConstructorOptions {
  /**
   * Path to a DataProvider
   */
  path: string[];

  /**
   * Qorus DataProvider api response data
   */
  responseData: DataProviderResponseData;

  /**
   * Context for the Qorus DataProvider api ex: 'record'
   */
  context: Context;

  /**
   * Error received if any from the Qorus DataProvider api
   */
  responseError?: ResponseError;
}
