import jsyaml from 'js-yaml';
import every from 'lodash/every';
import isArray from 'lodash/isArray';
import isNaN from 'lodash/isNaN';
import isObject from 'lodash/isPlainObject';
import size from 'lodash/size';
import uniqWith from 'lodash/uniqWith';
import { isBoolean, isNull, isString, isUndefined } from 'util';
import {
  fixOperatorValue,
  getAddress,
  getProtocol,
  getTemplateKey,
  getTemplateValue,
  IOptions,
  IQorusType,
  isValueTemplate,
  maybeBuildOptionProvider,
  splitByteSize,
  TApiManagerEndpoint,
  TOperatorValue,
  TOption,
  TTrigger,
} from './utils';
/*eslint-disable */
const cron = require('cron-validator');

export const validateField: (type: string | IQorusType, value?: any, canBeNull?: boolean) => boolean = (
  type,
  value,
  canBeNull,
) => {
  if (!type) {
    return false;
  }
  // Check if the type starts with a * to indicate it can be null
  if (type.startsWith('*')) {
    type = type.substring(1);
    canBeNull = true;
  }
  // If the value can be null an is null
  // immediately return true, no matter what type
  if (canBeNull && isNull(value)) {
    return true;
  }
  // Get the actual type
  // Check if there is a `<` in the type
  const pos: number = type.indexOf('<');
  // If there is a <
  if (pos > 0) {
    // Get the type from start to the position of the `<`
    type = type.slice(0, pos);
  }
  // Check if the value is a template string
  if (isValueTemplate(value)) {
    // Check if the template has both the key and value
    return !!getTemplateKey(value) && !!getTemplateValue(value);
  }
  // Check individual types
  switch (type) {
    case 'binary':
    case 'string':
    case 'mapper':
    case 'workflow':
    case 'service':
    case 'job':
    case 'connection':
    case 'softstring':
    case 'select-string':
    case 'file-string':
    case 'file-as-string':
    case 'long-string':
    case 'method-name': {
      if (value === undefined || value === null || value === '') {
        return false;
      }

      let isValid = true;

      // Strings cannot be empty
      return isValid;
    }
    case 'array-of-pairs': {
      let valid = true;

      return valid;
    }
    case 'class-connectors': {
      let valid = true;
      // Check if every pair has name, input method and output method
      // assigned properly
      console.log('I am here ');
      if (!Array.isArray(value) && !value.every((val) => val.name && val.method)) {
        console.log('I am here  too');

        return false;
      }
      // Get a list of unique values
      const uniqueValues: any[] = uniqWith(value, (cur, prev) => cur.name === prev.name);
      // Check if there are any duplicates
      if (size(uniqueValues) !== size(value)) {
        valid = false;
      }

      return valid;
    }

    // Later will do
    //=========================================
    // Classes check
    case 'class-array': {
      let valid = true;
      // Check if the fields are not empty
      if (!value?.every((pair: { [key: string]: string }): any => pair.name && pair.name !== '')) {
        valid = false;
      }
      // Get a list of unique values
      const uniqueValues: any[] = uniqWith(
        value,
        (cur, prev) => `${cur.prefix}${cur.name}` === `${prev.prefix}${prev.name}`,
      );
      // Check if there are any duplicates
      if (size(uniqueValues) !== size(value)) {
        valid = false;
      }

      return valid;
    }
    case 'int':
    case 'softint':
    case 'number':
      return !isNaN(value) && getTypeFromValue(value) === 'int';
    case 'float':
      return !isNaN(value) && (getTypeFromValue(value) === 'float' || getTypeFromValue(value) === 'int');
    case 'select-array':
    case 'array':
    case 'file-tree':
      // Check if there is atleast one value
      // selected
      return value && value.length !== 0;
    case 'cron':
      if (!value) {
        return false;
      }
      // Check if the cron is valid
      return cron.isValidCron(value, { alias: true });
    case 'date':
      // Check if the date is valid
      return value !== undefined && value !== null && value !== '' && new Date(value).toString() !== 'Invalid Date';
    case 'hash':
    case 'hash<auto>': {
      // Get the parsed yaml
      const parsedValue: any = value;
      // If the value is not an object or empty
      if (!parsedValue || !isObject(parsedValue)) {
        return false;
      }
      return true;
    }
    case 'list':
    case 'softlist':
    case 'list<auto>': {
      // Get the parsed yaml
      // If the value is not an object or empty
      return true;
    }
    case 'mapper-code':
      if (!value) {
        return false;
      }
      // Split the value
      const [code, method] = value.split('::');
      // Both fields need to be strings & filled
      return validateField('string', code) && validateField('string', method);
    case 'type-selector':
    case 'data-provider':
    case 'api-call':
    case 'search-single':
    case 'search':
    case 'update':
    case 'delete':
    case 'create':
      let newValue = maybeBuildOptionProvider(value);

      if (!newValue) {
        return false;
      }

      // Api call only supports  requests / response
      if (type === 'api-call' && !value.supports_request) {
        return false;
      }

      if (
        value.use_args &&
        value.args &&
        value.args?.type !== 'nothing' &&
        !validateField(value.args.type === 'hash' ? 'system-options' : value.args.type, value.args.value)
      ) {
        return false;
      }

      if (
        (type === 'search-single' || type === 'search') &&
        (size(value.search_args) === 0 || !validateField('system-options-with-operators', value.search_args))
      ) {
        return false;
      }

      if (
        (type === 'update' || type === 'create') &&
        (size(value[`${type}_args`]) === 0 || !validateField('system-options', value[`${type}_args`]))
      ) {
        return false;
      }

      if (newValue?.type === 'factory') {
        if (newValue.optionsChanged) {
          return false;
        }

        let options = true;

        if (newValue.options) {
          options = validateField('system-options', newValue.options);
        }

        if (newValue.search_options) {
          options = validateField('system-options', newValue.search_options);
        }

        // Type path and name are required
        return !!(newValue.type && newValue.name && options);
      }

      return !!(newValue.type && newValue.path && newValue.name);
    case 'context-selector':
      if (isString(value)) {
        const cont: string[] = value.split(':');
        return validateField('string', cont[0]) && validateField('string', cont[1]);
      }
      return !!value.iface_kind && !!value.name;
    case 'auto':
    case 'any': {
      // Parse the string as yaml
      let yamlCorrect = true;
      let parsedData;
      // Parse the yaml
      try {
        parsedData = jsyaml.safeLoad(value);
      } catch (e) {
        yamlCorrect = false;
      }

      if (!yamlCorrect) {
        return false;
      }

      if (parsedData) {
        return validateField(getTypeFromValue(parsedData), value);
      }

      return false;
    }
    case 'processor': {
      let valid = true;

      // Validate the input and output types
      if (value?.['processor-input-type'] && !validateField('type-selector', value?.['processor-input-type'])) {
        valid = false;
      }
      if (value?.['processor-output-type'] && !validateField('type-selector', value?.['processor-output-type'])) {
        valid = false;
      }

      return valid;
    }
    case 'fsm-list': {
      return value?.every((val: { name: string; triggers?: TTrigger[] }) => validateField('string', val.name) === true);
    }
    case 'api-manager': {
      if (!value) {
        return false;
      }

      let valid = true;

      if (!validateField('string', value.factory)) {
        valid = false;
      }

      if (!validateField('system-options', value['provider-options'])) {
        valid = false;
      }

      if (!validateField('api-endpoints', value.endpoints)) {
        valid = false;
      }

      return valid;
    }
    case 'api-endpoints': {
      if (!isArray(value) || !size(value)) {
        return false;
      }

      return value.every((endpoint: TApiManagerEndpoint) => validateField('string', endpoint.value));
    }
    case 'options':
    case 'pipeline-options':
    case 'mapper-options':
    case 'system-options': {
      const isValid = (val) => {
        if (!val || size(val) === 0) {
          if (canBeNull) {
            return true;
          }

          return false;
        }

        return every(val, (optionData) =>
          typeof optionData !== 'object'
            ? validateField(getTypeFromValue(optionData), optionData)
            : validateField(optionData.type, optionData.value),
        );
      };

      if (isArray(value)) {
        return value.every(isValid);
      }

      return isValid(value);
    }
    case 'system-options-with-operators': {
      console.log(value);
      const isValid = (val: IOptions) => {
        if (!val || size(val) === 0) {
          if (canBeNull) {
            return true;
          }

          return false;
        }

        return every(val, (optionData: TOption) => {
          let isValid: boolean =
            typeof optionData !== 'object'
              ? validateField(getTypeFromValue(optionData), optionData)
              : validateField(optionData.type, optionData.value);

          if (
            !optionData.op ||
            !(fixOperatorValue(optionData.op)! as TOperatorValue[]).every((operator) =>
              validateField('string', operator),
            )
          ) {
            isValid = false;
          }

          return isValid;
        });
      };

      if (isArray(value)) {
        return value.every(isValid);
      }

      return isValid(value);
    }
    case 'byte-size': {
      let valid = true;

      const [bytes, size] = splitByteSize(value)!;

      if (!validateField('number', bytes)) {
        valid = false;
      }

      if (!validateField('string', size)) {
        valid = false;
      }

      return valid;
    }
    case 'url': {
      return validateField('string', getProtocol(value)) && validateField('string', getAddress(value));
    }
    case 'nothing':
      return false;
    default:
      return true;
  }
};

export const isValueSet = (value: any, canBeNull?: boolean) => {
  if (canBeNull) {
    return !isUndefined(value);
  }

  return !isNull(value) && !isUndefined(value);
};

export const getValueOrDefaultValue = (value, defaultValue, canBeNull) => {
  if (isValueSet(value, canBeNull)) {
    return value;
  }

  if (isValueSet(defaultValue, canBeNull)) {
    return defaultValue;
  }

  return undefined;
};

export const getTypeFromValue = (value: any) => {
  if (isNull(value)) {
    return 'null';
  }
  if (isBoolean(value)) {
    return 'bool';
  }

  if (value === 0 || (Number(value) === value && value % 1 === 0)) {
    return 'int';
  }

  if (value === 0 || value === 0.0 || (Number(value) === value && value % 1 !== 0)) {
    return 'float';
  }
  if (isObject(value)) {
    return 'hash';
  }
  if (isArray(value)) {
    return 'list';
  }
  if (new Date(value).toString() !== 'Invalid Date') {
    return 'date';
  }
  if (isString(value)) {
    return 'string';
  }

  return 'none';
};