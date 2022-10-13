import { QorusRequest } from './QorusRequest';
import { apiPathsInitial } from './utils/apiPaths';

export interface Provider {
  /**
   * -getRecord-function Get record of Data Providers from /dataprovider/browse endpoint
   * @params props {@link ProviderProps}
   *
   * Returns array of records
   */
  getRecord: (props: ProviderProps) => any;
  getProviderOptions: () => ProviderOptions;
}

export interface ProviderProps {
  select?: { [x: string]: string | number | boolean | any[] };
  data?: { [x: string]: string | number | boolean };
  constructor_options?: { [x: string]: any };
}

export interface ProviderOptions {
  currentPath: string;
  dataObj: {
    [x: string]: string | number | boolean | any[];
  };
}

const _DataProvider = (): Provider => {
  /*eslint-disable*/
  let providerOptions: ProviderOptions = {
    currentPath: apiPathsInitial.dataProviders.browse,
    dataObj: {},
  };

  // Temporary function
  const getProviderOptions = () => {
    return providerOptions;
  };

  // Put DataProvider request with context record
  const getRecord = async (props: ProviderProps) => {
    // Select option defines the next value to be selected
    const { select, data, constructor_options } = props;
    if (select) {
      const selectPath = select.name ?? '';
      // Updating the currentPath as we move forward
      providerOptions.currentPath = providerOptions.currentPath + '/' + selectPath;
    }

    const requestData = { ...data, context: 'record', provider_options: constructor_options ?? {} };

    // Making a put request
    const result = await QorusRequest.put({
      path: providerOptions.currentPath,
      data: requestData,
    });

    providerOptions.dataObj = result?.data;

    // Returning only the children of the result data
    if (providerOptions?.dataObj?.hasOwnProperty('children')) return providerOptions?.dataObj?.children;
    return providerOptions?.dataObj;
  };

  return {
    getRecord,
    getProviderOptions,
  };
};

export const QorusDataProvider: Provider = _DataProvider();
