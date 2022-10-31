import logger from './managers/logger';

export interface Properties {
  name: string;
  required: boolean;
  types: string[];
  jsTypes: string[];
  value?: { type: string; value: any } | null;
}

export interface ConstructorOption {
  name: string;
  constructorOptions: Properties[];
}

const qorusDataTypesToJsTypesMapper = {
  'object<InputStream>': 'object',
  'object<AbstractDatasource>': 'object',
  'hash<auto>': 'object',
  softint: 'number',
  softbool: 'boolean',
  'softlist<string>': 'array',
};

export class QorusOptions {
  // Name of the provider options
  name = '';

  // Properties for provider
  constructorOptions: Properties[] = [];

  constructor(children: any) {
    this.parseChildren(children);
  }

  /**
   * A parser function to modify options object
   * @param children children for which options will be created
   * @returns object with constructor options {@link ConstructorOption}
   */
  private parseChildren(children: any): ConstructorOption | undefined {
    /*eslint-disable*/
    if (!children) {
      logger.error(`Children does not exist`);
      return undefined;
    }
    const constructorOptions = children.constructor_options;
    const name = children.name;
    let allProperties: Properties[] = [];

    for (const key in constructorOptions) {
      const property: Properties = {
        name: key,
        required: constructorOptions[key].required,
        types: constructorOptions[key].type,
        jsTypes: this.createJsTypes(constructorOptions[key].type),
        value: null,
      };
      allProperties.push(property);
    }

    const option: ConstructorOption = {
      name,
      constructorOptions: allProperties,
    };

    this.name = name;
    this.constructorOptions = allProperties;

    return option;
  }

  /**
   * -validate-function A validator to verify if all the required values are provided
   * @returns true if all the value exist, false otherwise
   */
  validate() {
    let result = true;
    this.constructorOptions.forEach((option): void | boolean => {
      if (option.required) {
        if (!option.value) {
          result = false;
          logger.error(`${option.name} is required for ${this.name} provider`);
        }
      }
    });
    return result;
  }

  /**
   * -getAll-function Get all values required for the provider
   * @returns all values if required values exist, undefined otherwise
   */
  getAll() {
    const isValid = this.validate();
    if (!isValid) return;

    let values = {};

    this.constructorOptions.forEach((option) => {
      if (option.value?.value) {
        values[`${option.name}`] = option.value?.value;
      }
    });

    return values;
  }

  /**
   * A parser function to modify options object
   * @param children children for which options will be created
   * @returns object with constructor options {@link ConstructorOption}
   */
  private createJsTypes(types: string[]) {
    if (!types) return [];
    let jsTypes: string[] = [];
    types.forEach((type) => {
      jsTypes.push(this.convertToJsType(type));
    });

    return jsTypes;
  }

  /**
   * A private function to convert types to js types
   * @param type type to be converted
   * @returns converted type
   */
  private convertToJsType(type: string) {
    if (qorusDataTypesToJsTypesMapper[type]) {
      return qorusDataTypesToJsTypesMapper[type];
    } else return type;
  }

  /**
   * -getTypeOptions-function A getter to get property type
   * @param propertyName name of the property
   * @return types accepted by the property
   */
  getType(propertyName: string) {
    const property = this.constructorOptions.find((property) => property.name === propertyName);
    if (!property?.types) {
      logger.error(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`);
    }
    return property?.types;
  }

  /**
   * -getJsType-function A getter to get js types for a property
   * @param propertyName name of the property
   * @returns js types accepted by the property
   */
  getJsType(propertyName: string) {
    const property = this.constructorOptions.find((property) => property.name === propertyName);
    if (!property?.jsTypes) {
      logger.error(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`);
    }
    return property?.jsTypes;
  }

  /**
   * -getProperty-function A getter to get property object
   * @param propertyName name of the property
   * @returns property object
   */
  get(propertyName: string) {
    const property = this.constructorOptions.find((property) => property.name === propertyName);
    if (!property) {
      logger.error(`Property ${propertyName} doesn't exist or doesn't contain any value for ${this.name}`);
    }
    return property;
  }

  /**
   * -setOptions-function A setter to set property value
   * @param propertyName name of the property
   * @param propertyValue value for the property
   * @returns property object
   */
  set(propertyName: string, value: any) {
    const isValid = this.validateProperty(propertyName, value);
    if (!isValid) {
      return;
    }

    let propertyIndex = this.constructorOptions.findIndex((property) => property.name === propertyName);
    const jsTypes = this.get(propertyName)?.jsTypes;
    const valueType = typeof value;
    const filteredType = jsTypes?.find((type) => type === valueType);

    if (filteredType) {
      this.constructorOptions[propertyIndex].value = { type: filteredType, value: value };
      return this.constructorOptions[propertyIndex];
    }
    return undefined;
  }

  /**
   * -validateProperty-function A method to validate if the provided value can be used by the property
   * @param propertyName name of the property
   * @param propertyValue value for the property
   * @returns true if value can be used false otherwise
   */
  validateProperty(propertyName: string, value: any) {
    const jsTypes = this.get(propertyName)?.jsTypes;
    const valueType = typeof value;

    if (Array.isArray(value)) {
      logger.error(`Value for property ${propertyName} is not valid, please provide values of type ${jsTypes}`);
      return false;
    }

    if (!jsTypes) {
      logger.error(`Property ${propertyName} doesn't exist in ${this.name} options`);
      return false;
    }

    const filteredType = jsTypes.find((type) => type === valueType);
    if (!filteredType) {
      logger.error(`Value for property ${propertyName} is not valid, please provide values of type ${jsTypes}`);
      return false;
    }

    return true;
  }
}
