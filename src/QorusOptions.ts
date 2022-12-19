import { ObjectWithStringKey } from '.';
import ErrorInternal from './managers/error/ErrorInternal';
import logger from './managers/logger';
import QorusValidator from './QorusValidator';

export interface Properties {
  /** Name of the property */
  name: string;

  /** If the property is required by the DataProvider */
  required: boolean;

  /** Allowed types for the property */
  types: string[];

  /** Converted js types for the property */
  jsTypes: string[];

  /** Value of the property*/
  value?: { type: string; value: any } | null;
}

export interface ProviderOption {
  /** Name of the DataProvider */
  name: string;

  /** DataProvider properties array */
  providerOptions: Properties[];
}

const qorusDataTypesToJsTypesMapper = {
  'object<InputStream>': 'object',
  'object<AbstractDatasource>': 'object',
  'hash<auto>': 'object',
  softint: 'number',
  softbool: 'boolean',
  'softlist<string>': 'array',
};

/** Children for the provider */
export type ProviderChildren = any;

export class QorusOptions {
  /** Name of the provider option  */
  name = '';

  // Array of all ProviderOptions for the data provider
  providerOptions: Properties[] = [];

  constructor(children: ProviderChildren) {
    this.parseChildren(children);
  }

  /**
   * A parser function to modify options object
   * @param children children for which options will be created
   * @returns Object with provider options
   */
  private parseChildren(children: ProviderChildren): ProviderOption | undefined {
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

    const option: ProviderOption = {
      name,
      providerOptions: allProperties,
    };

    this.name = name;
    this.providerOptions = allProperties;

    return option;
  }

  /**
   * A validator to verify if all the required values are provided
   * @returns True if all the value exist, False otherwise
   */
  validate(): boolean {
    let result = true;
    this.providerOptions.forEach((option): void | boolean => {
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
   * Get all values required for the provider
   * @returns Array of values for the constructor options if required values exist, undefined otherwise
   */
  getAll(): ObjectWithStringKey | undefined {
    const isValid = this.validate();
    if (!isValid) return;

    let values = {};

    this.providerOptions.forEach((option) => {
      if (option.value?.value) {
        values[`${option.name}`] = option.value?.value;
      }
    });

    return values;
  }

  /**
   * A parser function to modify options object
   * @param children Children for which options will be created
   * @returns Object with constructor options
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
   * @param type Type to be converted
   * @returns Converted type
   */
  private convertToJsType(type: string) {
    if (qorusDataTypesToJsTypesMapper[type]) {
      return qorusDataTypesToJsTypesMapper[type];
    } else return type;
  }

  /**
   * A getter to get property type
   * @param propertyName Name of the property
   * @return Types accepted by the property
   */
  getType(propertyName: string): string[] | undefined {
    const property = this.providerOptions.find((property) => property.name === propertyName);
    if (!property?.types) {
      logger.error(new ErrorInternal(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`));
    }
    return property?.types;
  }

  /**
   * A getter to get js types for a property
   * @param propertyName name of the property
   * @returns js types accepted by the property
   */
  getJsType(propertyName: string): string[] | undefined {
    const property = this.providerOptions.find((property) => property.name === propertyName);
    if (!property?.jsTypes) {
      logger.error(new ErrorInternal(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`));
    }
    return property?.jsTypes;
  }

  /**
   * A getter to get constructor options property object
   * @param propertyName Name of the property
   * @returns Property object with name and value
   */
  get(propertyName: string): Properties | undefined {
    const property = this.providerOptions.find((property) => property.name === propertyName);
    if (!property) {
      logger.error(
        new ErrorInternal(`Property ${propertyName} doesn't exist or doesn't contain any value for ${this.name}`),
      );
    }
    return property;
  }

  /**
   * A setter to set constructor options property value
   * @param propertyName Name of the property
   * @param propertyValue Value for the property
   * @returns Property object
   */
  set(propertyName: string, value: any): Properties | undefined {
    const isValid = this.validateProperty(propertyName, value);
    if (!isValid) {
      throw new ErrorInternal(`Value is not valid for the property ${propertyName}`);
    }

    let propertyIndex = this.providerOptions.findIndex((property) => property.name === propertyName);
    const jsTypes = this.get(propertyName)?.jsTypes;
    const valueType = typeof value;
    const filteredType = jsTypes?.find((type) => type === valueType);

    if (filteredType) {
      this.providerOptions[propertyIndex].value = { type: filteredType, value: value };
      return this.providerOptions[propertyIndex];
    }
    return undefined;
  }

  /**
   * A method to validate if the provided value can be used by the property
   * @param propertyName Name of the property
   * @param propertyValue Value for the property
   * @returns True if value can be used, False otherwise
   */
  validateProperty(propertyName: string, value: any): boolean {
    const types = this.get(propertyName)?.types;
    if (types) {
      let result = false;
      types.forEach((type) => {
        if (QorusValidator.validate(type, value)) {
          result = true;
        }
      });
      return result;
    }
    return false;
  }
}
