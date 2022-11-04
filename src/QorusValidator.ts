import {
  IQorusType,
  isValueTemplate,
  getTemplateKey,
  getTemplateValue,
  maybeBuildOptionProvider,
  TTrigger,
  TOption,
  fixOperatorValue,
  TOperatorValue,
  splitByteSize,
  getProtocol,
  getAddress,
} from './utils/validation/utils';
import uniqWith from 'lodash/uniqWith';
import size from 'lodash/size';
import jsYaml from 'js-yaml';
import every from 'lodash/every';
import { getTypeFromValue } from './utils/validation/validation';

const cron = require('cron-validator');
/*eslint-disable */

export class QorusValidator {
  validateField: (type: string | IQorusType, value?: any, canBeNull?: boolean) => boolean = (
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
    if (canBeNull && value === null) {
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
        if (typeof value !== 'string') return false;

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
        if (!Array.isArray(value) || !value[0]) return false;
        value.forEach((val) => {
          if (!(val.name && val.method)) {
            valid = false;
          }
        });
        // Get a list of unique values
        const uniqueValues: any[] = uniqWith(value, (cur, prev) => cur.name === prev.name);
        // Check if there are any duplicates
        if (size(uniqueValues) !== size(value)) {
          valid = false;
        }

        return valid;
      }
      // Classes check
      case 'class-array': {
        // test-undone
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
      case 'cron': // test undone
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
        if (!parsedValue || typeof parsedValue !== 'object') {
          return false;
        }
        return true;
      }
      case 'list':
      case 'softlist':
      case 'list<auto>': {
        // Get the parsed yaml
        // If the value is not an object or empty
        if (value && typeof value === 'object') return true;
        else return false;
      }
      case 'mapper-code':
        if (!value) {
          return false;
        }
        // Split the value
        const [code, method] = value.split('::');
        // Both fields need to be strings & filled
        return this.validateField('string', code) && this.validateField('string', method);
      case 'type-selector':
      case 'data-provider':
      case 'api-call':
      case 'search-single':
      case 'search':
      case 'update':
      case 'delete':
      case 'create':
        const newValue = maybeBuildOptionProvider(value);
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
          !this.validateField(value.args.type === 'hash' ? 'system-options' : value.args.type, value.args.value)
        ) {
          return false;
        }

        if (
          (type === 'search-single' || type === 'search') &&
          (size(value.search_args) === 0 || !this.validateField('system-options-with-operators', value.search_args))
        ) {
          return false;
        }

        if (
          (type === 'update' || type === 'create') &&
          (size(value[`${type}_args`]) === 0 || !this.validateField('system-options', value[`${type}_args`]))
        ) {
          return false;
        }

        if (newValue?.type === 'factory') {
          if (newValue.optionsChanged) {
            return false;
          }

          let options = true;

          if (newValue.options) {
            options = this.validateField('system-options', newValue.options);
          }

          if (newValue.search_options) {
            options = this.validateField('system-options', newValue.search_options);
          }

          // Type path and name are required
          return !!(newValue.type && newValue.name && options);
        }

        return !!(newValue.type && newValue.path && newValue.name);
      case 'context-selector':
        if (typeof value === 'string') {
          const cont: string[] = value.split(':');
          return this.validateField('string', cont[0]) && this.validateField('string', cont[1]);
        }
        return !!value.iface_kind && !!value.name;
      case 'auto':
      case 'any': {
        // Parse the string as yaml
        let yamlCorrect = true;
        let parsedData;
        // Parse the yaml
        try {
          parsedData = jsYaml.load(value);
        } catch (e) {
          yamlCorrect = false;
        }

        if (!yamlCorrect) {
          return false;
        }

        if (parsedData) {
          return this.validateField(getTypeFromValue(parsedData), value);
        }

        return false;
      }
      case 'processor': {
        let valid = true;
        if (!value['processor-input-type'] || !value['processor-output-type'] || !value) {
          return false;
        }

        // Validate the input and output types
        if (!this.validateField('type-selector', value['processor-input-type'])) {
          valid = false;
        }
        if (!this.validateField('type-selector', value['processor-output-type'])) {
          valid = false;
        }

        return valid;
      }
      case 'fsm-list': {
        return (
          value.length !== 0 &&
          value?.every(
            (val: { name: string; triggers?: TTrigger[] }) => this.validateField('string', val.name) === true,
          )
        );
      }
      case 'api-manager': {
        if (!value) {
          return false;
        }

        let valid = true;

        if (
          !this.validateField('string', value.factory) ||
          !this.validateField('system-options', value['provider-options']) ||
          !this.validateField('api-endpoints', value.endpoints)
        ) {
          valid = false;
        }

        return valid;
      }
      case 'api-endpoints': {
        if (!Array.isArray(value) || !size(value)) {
          return false;
        }

        return value.every((endpoint: any) => this.validateField('string', endpoint.value));
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
              ? this.validateField(getTypeFromValue(optionData), optionData)
              : this.validateField(optionData.type, optionData.value),
          );
        };

        if (Array.isArray(value)) {
          return value.every(isValid);
        }

        return isValid(value);
      }
      case 'system-options-with-operators': {
        const isValidVal = (val: unknown) => {
          if (!val || size(val) === 0) {
            if (canBeNull) {
              return true;
            }

            return false;
          }

          return every(val, (optionData: TOption) => {
            let isValid: boolean =
              typeof optionData !== 'object'
                ? this.validateField(getTypeFromValue(optionData), optionData)
                : this.validateField(optionData.type, optionData.value);

            if (
              !optionData.op ||
              !(fixOperatorValue(optionData.op)! as TOperatorValue[]).every((operator) =>
                this.validateField('string', operator),
              )
            ) {
              isValid = false;
            }

            return isValid;
          });
        };

        if (Array.isArray(value)) {
          return value.every(isValidVal);
        }

        return isValidVal(value);
      }
      case 'byte-size': {
        let valid = true;
        if (typeof value !== 'string') return false;

        const result = splitByteSize(value)!;
        if (!result?.[0] || !result?.[1]) return false;

        const bytes = result[0];
        const sizeN = result[1];
        if (!this.validateField('number', bytes)) {
          valid = false;
        }

        if (!this.validateField('string', sizeN)) {
          valid = false;
        }

        return valid;
      }
      case 'url': {
        return this.validateField('string', getProtocol(value)) && this.validateField('string', getAddress(value));
      }
      case 'nothing':
        return false;
      default:
        return true;
    }
  };
}

export default new QorusValidator();
