import { isArray } from 'lodash';
import { reduce, size } from 'lodash';

export const getAddress = (v) => {
  return v?.split('://')?.[1] || '';
};
export const fixOperatorValue = (operator: TOperatorValue): string | TOperatorValue[] | null | undefined => {
  return isArray(operator) ? operator : [operator];
};
export const templatesList = [
  'local',
  'timestamp',
  'rest',
  'qore-expr',
  'static',
  'dynamic',
  'sensitive',
  'sensitive-alias',
  'temp',
  'step',
  'keys',
  'transient',
  'config',
  'info',
  'parse-value',
  'pstate',
  'state',
  'qore-expr-value',
];
/*eslint-disable */
export type ValueTemplate = any;
export const isValueTemplate = (value?: ValueTemplate) => {
  if (typeof value !== 'string' || !value?.startsWith('$') || !value?.includes(':')) {
    return false;
  }
  // Get everything between first $ and first colon
  const template = value.substring(value.indexOf('$') + 1, value.indexOf(':'));
  // Check if the template matches a template from the list
  return templatesList.includes(template);
};

export const getProtocol = (v) => {
  return v?.split('://')?.[0] || '';
};

export const getTemplateValue = (value?: string) => {
  if (value && isValueTemplate(value)) {
    return value.substring(value.indexOf(':') + 1);
  }
  return null;
};

export const getTemplateKey = (value?: string) => {
  if (value && isValueTemplate(value)) {
    return value.substring(value.indexOf('$') + 1, value.indexOf(':'));
  }

  return null;
};
export type TTrigger = { class?: string; connector?: string; method?: string };

export const splitByteSize = (value: string): [number, string] | null => {
  const bytes: string[] | null = (value || '').match(/\d+/g);
  const size: string[] | null = (value || '').match(/[a-zA-Z]+/g);
  if (size) return [Number(bytes?.[0] ?? null), size?.[0] ?? null];
  else return null;
};

export const maybeBuildOptionProvider = (provider) => {
  if (!provider) {
    return null;
  }

  // If the provider is an object, return it
  if (typeof provider === 'object') {
    return provider;
  }
  // Check if the provider is a factory
  if (provider.startsWith('factory')) {
    // Get everything between the < and >
    // const factory = provider.substring(provider.indexOf('<') + 1, provider.indexOf('>'));
    // Get the factory name
    const [factoryType, nameWithOptions]: string[] = provider.split('/');
    // Get everything between the first / and { bracket
    const [factoryName] = nameWithOptions.split('{');
    // Get everything in the provider between first { and last }, which are the options
    const options = nameWithOptions.substring(nameWithOptions.indexOf('{') + 1, nameWithOptions.lastIndexOf('}'));
    // Split the options by comma
    const optionsArray = options.split(',');
    let optionsObject = {};
    if (size(optionsArray)) {
      // Map through all the options and split each by =, which is the key and value
      optionsObject = reduce(
        optionsArray,
        (newOptions, option) => {
          const [key, value] = option.split('=');
          return { ...newOptions, [key]: value };
        },
        {},
      );
    }
    // Return the new provider
    const result: IProviderType = {
      type: factoryType,
      name: factoryName,
      // Get everything after the last }/ from the provider
      path: provider.substring(provider.lastIndexOf('}/') + 2),
      options: optionsObject,
    };
    // Add the optionsChanged key if the provider includes the "?options_changed" string
    if (provider.includes('?options_changed')) {
      result.optionsChanged = true;
    }

    return result;
  }
  // split the provider by /
  const [type, name, ...path] = provider.split('/');
  // Return it
  return {
    type,
    name,
    path: path.join('/'),
  };
};

export type TOption = {
  type: IQorusType;
  value: any;
  op?: TOperatorValue;
};
export type TOperatorValue = string | string[] | undefined | null;

export type IQorusType =
  | 'string'
  | 'int'
  | 'list'
  | 'bool'
  | 'float'
  | 'binary'
  | 'hash'
  | 'date'
  | 'any'
  | 'auto'
  | 'mapper'
  | 'workflow'
  | 'service'
  | 'job'
  | 'select-string'
  | 'data-provider'
  | 'file-as-string'
  | 'number';

export type IOptions =
  | {
      [optionName: string]: TOption;
    }
  | undefined;
export interface IOptionsSchemaArg {
  type: IQorusType | IQorusType[];
  default_value?: any;
  required?: boolean;
  allowed_values?: any[];
  sensitive?: boolean;
  desc?: string;
  arg_schema?: IOptionsSchema;
}

export interface IOptionsSchema {
  [optionName: string]: IOptionsSchemaArg;
}

export type TRecordType = 'search' | 'search-single' | 'create' | 'update' | 'delete';
export type TRealRecordType = 'read' | 'create' | 'update' | 'delete';

export type TProviderTypeSupports = {
  [key in `supports_${TRealRecordType}`]?: boolean;
};

export type TProviderTypeArgs = {
  [key in `${TRecordType}_args`]?: IOptions | IOptions[];
};

export interface IProviderType extends TProviderTypeSupports, TProviderTypeArgs {
  type: string;
  name: string;
  path?: string;
  options?: IOptions;
  subtype?: 'request' | 'response';
  hasApiContext?: boolean;
  optionsChanged?: boolean;
  desc?: string;
  use_args?: boolean;
  args?: any;
  supports_request?: boolean;
  is_api_call?: boolean;
  search_options?: IOptions;
  descriptions?: { [key: string]: string };
}

export type TApiManagerFactory = 'swagger' | 'soap';
export type TApiManagerEndpointType = 'fsm' | 'method';
export type TApiManagerOptions = IOptions;
export type TApiManagerEndpoint = {
  endpoint: string;
  type?: TApiManagerEndpointType;
  value?: string;
};
