import logger from './managers/logger';

export interface Properties {
  name: string;
  required: boolean;
  type: string;
  jsType: string;
  value: string;
}

export interface ConstructorOption {
  name: string;
  properties: Properties;
}

const qorusDataTypesToJsTypesMapper = {
  'object<InputStream>': 'object',
  'hash<auto>': 'object',
  softint: 'number',
  softbool: 'boolean',
  'softlist<string>': 'array',
};

export class QorusOptions {
  private options: ConstructorOption[] = [];

  constructor(children: any[]) {
    this.options = this.parseChildren(children);
  }

  private parseChildren(children: any[]) {
    let allChildrenProperties: ConstructorOption[] = [];
    children.forEach((child) => {
      const option: ConstructorOption = {
        name: child.name,
        properties: child.constructor_options,
      };

      allChildrenProperties.push(option);
    });

    return allChildrenProperties;
  }

  getOptionType(option?: ConstructorOption) {
    const optionType = option?.properties.type;
    if (typeof option === 'undefined') return;
    if (!option?.properties.type) {
      logger.error('Constructor option provided does not contain a type');
      return;
    }

    if (qorusDataTypesToJsTypesMapper[optionType!] !== undefined) {
      return qorusDataTypesToJsTypesMapper[optionType!];
    } else return optionType;
  }

  validate(optionName: string, value?: any) {
    const selectedOption = this.options.find((option) => option.name === optionName);
    const properties = selectedOption?.properties;
    const optionType = this.getOptionType(selectedOption);
    const valueType = typeof value;

    // If the selected option does not exists in constructor_options return false
    if (typeof selectedOption === 'undefined' || typeof optionType === 'undefined') {
      logger.error('Provided option does not exist');
      return false;
    }

    // If the selected option is required and the value is undefined, return false
    if (properties?.required && valueType === 'undefined') {
      logger.error(`Option: ${optionName} is required, please provide a valid value.`);
      return false;
    }

    // If the selected option type and the type of value is equal return true
    if (optionType === valueType) return true;

    return false;
  }

  getJsType(optionName: string) {
    const selectedOption = this.options.find((option) => option.name === optionName);

    return this.getOptionType(selectedOption);
  }

  getType(optionName: string) {
    const selectedOption = this.options.find((option) => option.name === optionName);

    return selectedOption?.properties.type;
  }
}
