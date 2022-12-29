import { ObjectWithAnyKey, ObjectWithStringKey } from '.';
import ErrorInternal from './managers/error/ErrorInternal';
import logger from './managers/logger';
import {
  DataProviderChildren,
  DataProviderChildrenConstructorOptions,
  DataProviderChildrenConstructorPropertyOptions,
} from './QorusDataProvider';
import QorusValidator from './QorusValidator';

const qorusDataTypesToJsTypesMapper = {
  'object<InputStream>': 'object',
  'object<AbstractDatasource>': 'object',
  'hash<auto>': 'object',
  softint: 'number',
  softbool: 'boolean',
  'softlist<string>': 'array',
};

/**
 * QorusOptions is a helper class which makes working Qorus DataProvider constructor_options easier
 * - Validate constructor_options property value
 * - set and get constructor_options property values
 * @returns QorusOptions class object
 * @Category QorusOptions
 */
export class QorusOptions {
  /** Name of the provider option  */
  name = '';

  // Array of all ProviderOptions for the data provider
  dataProviderConstructorOptions: DataProviderChildrenConstructorOptions = {};

  constructor(children: DataProviderChildren) {
    this.name = children.name;
    this.dataProviderConstructorOptions = children.constructor_options;
    this.adjustChildren();
  }

  /**
   * A getter to get constructor options property object
   * @param propertyName Name of the property
   * @returns Property object with name and value
   */
  get(optionName: string): DataProviderChildrenConstructorPropertyOptions | undefined {
    if (this.dataProviderConstructorOptions && this.dataProviderConstructorOptions.hasOwnProperty(optionName)) {
      return this.dataProviderConstructorOptions[optionName];
    } else return undefined;
  }

  private adjustChildren() {
    Object.keys(this.dataProviderConstructorOptions).map((key) => {
      this.dataProviderConstructorOptions[key].jsType = this.createJsTypes(
        this.dataProviderConstructorOptions[key].type,
      );
      this.dataProviderConstructorOptions[key].name = key;
    });
  }

  /**
   * A validator method to check if all the required properties for a data provider contains a value
   * @returns True if values for all the required properties exist, false otherwise
   */
  validateRequired(): boolean {
    let result = true;
    for (const key in this.dataProviderConstructorOptions) {
      if (this.dataProviderConstructorOptions[key].required) {
        if (!this.dataProviderConstructorOptions[key].value) {
          result = false;
          logger.error(`${key} is required for ${this.name} provider`);
        }
      }
    }
    return result;
  }

  /**
   * Get all values required for the provider
   * @returns Array of values for the constructor options if required values exist, undefined otherwise
   */
  getAll(): ObjectWithStringKey | undefined {
    const isValid = this.validateRequired();
    if (!isValid) {
      return undefined;
    }

    const allOptions: ObjectWithAnyKey | undefined = {};
    Object.keys(this.dataProviderConstructorOptions).map((key) => {
      if (this.dataProviderConstructorOptions[key].value) {
        allOptions[key] = this.dataProviderConstructorOptions[key].value;
      }
    });

    return allOptions;
  }

  /**
   * A parser function to modify options object
   * @param children Children for which options will be created
   * @returns Object with constructor options
   */
  private createJsTypes(types: string[]): string[] {
    if (!types) return [];
    const jsTypes: string[] = [];
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
    if (qorusDataTypesToJsTypesMapper.hasOwnProperty(type)) {
      return qorusDataTypesToJsTypesMapper[type] as string;
    } else return type;
  }

  /**
   * A getter to get property type
   * @param propertyName Name of the property
   * @return Types accepted by the property
   */
  getType(propertyName: string): string[] | undefined {
    if (this.dataProviderConstructorOptions.hasOwnProperty(propertyName)) {
      if (!this.dataProviderConstructorOptions[propertyName].type) {
        logger.error(
          new ErrorInternal(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`),
        );
      }
      return this.dataProviderConstructorOptions[propertyName].type;
    }
    logger.error(new ErrorInternal(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`));
    return undefined;
  }

  /**
   * A getter to get js types for a property
   * @param propertyName name of the property
   * @returns js types accepted by the property
   */
  getJsType(propertyName: string): string[] | undefined {
    if (
      this.dataProviderConstructorOptions.hasOwnProperty(propertyName) &&
      this.dataProviderConstructorOptions[propertyName].jsType
    ) {
      return this.dataProviderConstructorOptions[propertyName].jsType;
    }
    logger.error(new ErrorInternal(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`));
    return undefined;
  }

  /**
   * A setter to set constructor options property value
   * @param propertyName Name of the property
   * @param propertyValue Value for the property
   * @returns Property object
   */
  set(propertyName: string, value: any): DataProviderChildrenConstructorPropertyOptions | undefined {
    const isValid = this.validate(propertyName, value);
    if (!isValid) {
      throw new ErrorInternal(`Value is not valid for the property ${propertyName}`);
    }
    if (this.dataProviderConstructorOptions.hasOwnProperty(propertyName)) {
      this.dataProviderConstructorOptions[propertyName].value = value;
    }

    return this.dataProviderConstructorOptions[propertyName];
  }

  /**
   * A method to validate if the provided value can be used by the property
   * @param propertyName Name of the property
   * @param propertyValue Value for the property
   * @returns True if value can be used, False otherwise
   */
  validate(propertyName: string, value: any): boolean {
    const types = this.get(propertyName)?.type;
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
