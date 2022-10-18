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
  getRecord: (props: ProviderProps) => Promise<ProviderWithOptions>;
  getProviderOptions: () => ProviderOptions;
}

export interface ProviderProps {
  select?: { [x: string]: string | number | boolean | any[] };
  data?: { [x: string]: string | number | boolean };
  constructor_options?: { [x: string]: any };
}

export interface ProviderOptions {
  currentPath: string[];
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
  let providerOptions: ProviderOptions = {
    currentPath: [apiPathsInitial.dataProviders.browse],
    dataObj: {},
  };

  // Temporary function
  const getProviderOptions = () => {
    return providerOptions;
  };

  // Put DataProvider request with context record
  const getRecord = async (props: ProviderProps): Promise<ProviderWithOptions> => {
    // Select option defines the next value to be selected
    const { select, data, constructor_options } = props;

    if (select) {
      const selectPath: string = (select.name ?? '').toString();
      // Updating the currentPath as we move forward
      providerOptions.currentPath.push(selectPath);
    }

    const requestPath = getRequestPath(providerOptions.currentPath);
    const requestData = { ...data, context: 'record', provider_options: constructor_options ?? {} };

    // Making a put request
    const result = await QorusRequest.put({
      path: requestPath,
      data: requestData,
    });

    const response = result as AxiosResponse;
    const error = result as AxiosError;

    providerOptions.dataObj = response?.data;

    // Returning only the children of the result data
    // if (providerOptions?.dataObj?.hasOwnProperty('children')) return providerOptions?.dataObj?.children;
    // return providerOptions?.dataObj;
    return new ProviderWithOptions(providerOptions.currentPath, providerOptions.dataObj, 'record');
  };

  return {
    getRecord,
    getProviderOptions,
  };
};

export const QorusDataProvider: Provider = _DataProvider();

type Context = 'record' | 'api' | 'event' | undefined;

const fetchProvider = async (
  obj: ProviderWithOptions,
  context: Context,
  select?: string,
  data?: any,
  providerOptions?: any,
) => {
  const children = obj.getChildren();
  let _path = obj.getPath();

  if (select && children?.find((object) => object.name === select)) {
    if (_path[_path.length - 1] !== select) {
      _path.push(select);
    }
  }
  const requestPath = getRequestPath(_path);
  const requestData = { ...data, context: context, provider_options: providerOptions ?? {} };
  // Making a put request
  const result = await QorusRequest.put({
    path: requestPath,
    data: requestData,
  });
  const response = result as AxiosResponse;
  const error = result as AxiosError;

  if (error.code) {
    logger.error('Request is not valid, please verify provided data and provider options fields.');
    let newObj = obj;
    newObj.setPath(_path);
    newObj.setDataObj(obj.getData().children.filter((object) => object.name === select));
    return newObj;
  }

  if (obj.getPath() === _path) {
    obj.setDataObj(response?.data);
    return obj;
  }

  return new ProviderWithOptions(_path, response?.data, context);
};

class ProviderWithOptions {
  private path: string[] = [''];
  private dataObj: any = {};
  private context: Context;

  constructor(path: string[], dataObj: any, context: Context) {
    this.path = path;
    this.dataObj = dataObj;
    this.context = context;
  }

  getPath() {
    return this.path;
  }

  hasData() {
    if (this.dataObj.matches_context) return true;
    else return false;
  }

  getData() {
    return this.dataObj;
  }

  getChildren() {
    return this.dataObj.children;
  }

  setDataObj(dataObj: any) {
    this.dataObj = dataObj;
  }

  setPath(path: string[]) {
    this.path = path;
  }

  async get(select?: string, data?: any, providerOptions?: any) {
    if (!select) return this;

    const childData = await fetchProvider(this, this.context, select, data, providerOptions);

    // const selectChild = children?.filter((child) => child.name === name);
    return childData;
  }
}
