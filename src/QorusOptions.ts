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
  name: string = '';
  constructorOptions: Properties[] = [];

  constructor(children: any) {
    this.parseChildren(children);
  }

  private parseChildren(children: any) {
    /*eslint-disable*/

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

  private createJsTypes(types: string[]) {
    if (!types) return [];
    let jsTypes: string[] = [];
    types.forEach((type) => {
      jsTypes.push(this.convertToJsType(type));
    });

    return jsTypes;
  }

  private convertToJsType(type: string) {
    if (qorusDataTypesToJsTypesMapper[type]) {
      return qorusDataTypesToJsTypesMapper[type];
    } else return type;
  }

  getType(propertyName: string) {
    const property = this.constructorOptions.find((property) => property.name === propertyName);
    if (!property?.types) {
      logger.error(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`);
    }
    return property?.types;
  }

  getJsType(propertyName: string) {
    const property = this.constructorOptions.find((property) => property.name === propertyName);
    if (!property?.jsTypes) {
      logger.error(`Property ${propertyName} doesn't exist in constructor options of ${this.name}`);
    }
    return property?.jsTypes;
  }

  get(propertyName: string) {
    const property = this.constructorOptions.find((property) => property.name === propertyName);
    if (!property) {
      logger.error(`Property ${propertyName} doesn't exist or doesn't contain any value for ${this.name}`);
    }
    return property;
  }

  set(propertyName: string, value: any) {
    const isValid = this.validate(propertyName, value);
    if (!isValid) {
      return;
    } else console.log("it's valid");
    let propertyIndex = this.constructorOptions.findIndex((property) => property.name === propertyName);
    const jsTypes = this.get(propertyName)?.jsTypes;
    const valueType = typeof value;
    const filteredType = jsTypes?.find((type) => type === valueType);
    if (filteredType) {
      console.log('filteredType type is = ', filteredType);

      this.constructorOptions[propertyIndex].value = { type: filteredType, value: value };
      return this.constructorOptions[propertyIndex];
    }
    return undefined;
  }

  validate(propertyName: string, value: any) {
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
