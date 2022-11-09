import { isArray } from 'lodash';
import { reduce, size } from 'lodash';

/**
 * Function to trimmed address for a url
 * @param v address url
 * @returns address without https://
 */
export const getAddress = (v: string) => {
  return v?.split('://')?.[1] || '';
};

/**
 * Function to convert operator to array if not
 * @param operator operator, can be string or string[]
 * @returns array of strings
 */
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

/**
 * Function to verify if the value is a Template string
 * @param value value for the property
 * @returns true if value is a template string
 */
export const isValueTemplate = (value?: ValueTemplate) => {
  if (typeof value !== 'string' || !value?.startsWith('$') || !value?.includes(':')) {
    return false;
  }
  // Get everything between first $ and first colon
  const template = value.substring(value.indexOf('$') + 1, value.indexOf(':'));
  // Check if the template matches a template from the list
  return templatesList.includes(template);
};

/**
 * Function to return protocol address
 * @param v string with protocol address
 * @returns trimmed protocol string with https://
 */
export const getProtocol = (v: string) => {
  return v?.split('://')?.[0] || '';
};

/**
 * Function to return template value
 * @param value value for the template
 * @returns string containing template value
 */
export const getTemplateValue = (value?: string) => {
  if (value && isValueTemplate(value)) {
    return value.substring(value.indexOf(':') + 1);
  }
  return null;
};

/**
 * Function to return key for the template value
 * @param value template string
 * @returns key for the template property
 */
export const getTemplateKey = (value?: string) => {
  if (value && isValueTemplate(value)) {
    return value.substring(value.indexOf('$') + 1, value.indexOf(':'));
  }

  return null;
};
export type TTrigger = { class?: string; connector?: string; method?: string };

/**
 * Splits the size string in bytes and size
 * @param value string with bytes and size 32MB
 * @returns array with [byte, size]
 */
export const splitByteSize = (value: string): [number, string] | null => {
  const bytes: string[] | null = (value || '').match(/\d+/g);
  const size: string[] | null = (value || '').match(/[a-zA-Z]+/g);
  if (size) return [Number(bytes?.[0] ?? null), size?.[0] ?? null];
  else return null;
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
