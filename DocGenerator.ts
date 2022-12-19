import fs from 'fs';
import {
  ArrayTypeParser,
  ClassMethodParser,
  ClassParser,
  InterfaceParser,
  IntersectionTypeParser,
  IntrinsicTypeParser,
  LiteralTypeParser,
  ProjectParser,
  ReferenceTypeParser,
  ReflectionTypeParser,
  TypeAliasParser,
  UnionTypeParser,
} from 'typedoc-json-parser';
import {
  InterfaceDocs,
  Json,
  MethodDocs,
  MethodParamTypes,
  MethodReturnType,
  ParamType,
  TypeAliasDocs,
} from './src/stories/types';

export const parsedProjectDocs = './src/stories/docs.ts';
export const typedocDocs = './docs/documentation.json';

class DocGenerator {
  project: ProjectParser;

  allClasses: ClassParser[] = [];

  allInterfaces: InterfaceParser[] = [];

  allTypeAliases: TypeAliasParser[] = [];

  constructor() {
    // Reading docs generated by typedoc
    const raw = fs.readFileSync(typedocDocs, { encoding: 'utf-8' });
    // Converting to JSON
    const parsedData = JSON.parse(raw);
    const projectData: ProjectParser | undefined = new ProjectParser({ data: parsedData });
    this.project = projectData;

    let classObj: ClassParser[] = [];
    this.project.namespaces?.forEach((namespace) => {
      classObj = [...classObj, ...namespace.classes];
    });
    this.allClasses = classObj;

    let interfaceObject: InterfaceParser[] = [];
    this.project.namespaces.forEach((namespace) => {
      interfaceObject = [...interfaceObject, ...namespace.interfaces];
    });
    this.allInterfaces = interfaceObject;

    this.allTypeAliases = projectData.typeAliases;
  }

  /** Creates documentation for Classes, Interfaces, Methods, and types
   * @returns Object with all the parsed docs and saves them to the file
   */
  createAllDocsJson() {
    const classesDocs = this.createAllClassesJson();
    const methodDocs = this.createAllMethodsJson();
    const interfaceDocs: (InterfaceDocs | undefined)[] = this.createAllInterfacesJson();
    const typeAliasDocs: (TypeAliasDocs | undefined)[] = this.createAllTypeAliasJson();

    // Create a typescript file that exports an object containing classesDocs and methodDocs
    fs.writeFileSync(
      parsedProjectDocs,
      `export default { classesDocs: ${JSON.stringify(classesDocs)}, methodDocs: ${JSON.stringify(
        methodDocs,
      )},interfaceDocs: ${JSON.stringify(interfaceDocs)}, typeAliasDocs: ${JSON.stringify(typeAliasDocs)} }`,
    );

    return {
      classesDocs,
      methodDocs,
      interfaceDocs,
      typeAliasDocs,
    };
  }

  /**
   * A getter to get the parsed project documentation json
   * @returns Parsed project as a json
   */
  getProject(): ProjectParser {
    return this.project;
  }

  /**
   * A getter to get the parsed json documentation for a class
   * @param className Name of the the class to parse
   * @returns Parsed class json if the class exist, undefined otherwise
   */
  getClass(className: string): ClassParser | undefined {
    return this.allClasses.find((classObj) => classObj.name === className);
  }

  /**
   * If the classObj is not undefined, return the method with the given name from the classObj's
   * methods array, or undefined if no such method exists.
   * @param methodName Name of the method you want to find.
   * @param classObj Class object that you want to search for the method in.
   * @returns Method object with the name that matches the methodName parameter.
   */
  getMethod(methodName: string, classObj: ClassParser | undefined): ClassMethodParser | undefined {
    if (!classObj) return undefined;
    return classObj.methods?.find((method) => method.name === methodName);
  }

  /**
   * A getter to get the parsed json documentation for an interface
   * @param interfaceName Name of the interface to parse
   * @returns
   */
  getInterface(interfaceName: string): InterfaceParser | undefined {
    return this.allInterfaces.find((obj) => obj.name === interfaceName);
  }

  /**
   * A getter to get the parsed json documentation for an type
   * @param typeAliasName Name of the type to parse
   * @returns Parsed type documentation as json if the type exist, undefined otherwise
   */
  getTypeAlias(typeAliasName: string): TypeAliasParser | undefined {
    return this.allTypeAliases.find((obj) => obj.name === typeAliasName);
  }

  /**
   * A getter to get the parsed json documentation for all the classes
   * @returns Parsed Array of all classes documentation as json if the classes exists, undefined otherwise
   */
  getAllClasses(): ClassParser[] | undefined {
    return this.allClasses;
  }

  /**
   * A getter to get the parsed json documentation for all the interfaces
   * @returns Parsed Array of all interfaces documentation as json if the classes exists, undefined otherwise
   */
  getAllInterfaces(): InterfaceParser[] | undefined {
    return this.allInterfaces;
  }

  /**
   * A getter to get the parsed json documentation for all the types
   * @returns Parsed Array of all types documentation as json if the types exists, undefined otherwise
   */
  getAllTypeAlias(): TypeAliasParser[] | undefined {
    return this.allTypeAliases;
  }

  /**
   * A getter to get type of an type alias documentation
   * @param typeJson Json object of type alias properties
   * @returns Type of the type alias
   */
  getTypeAliasType(typeJson: any) {
    const adjustedType = this.getAdjustedType(typeJson);
    let typeAliasTypes;
    if (adjustedType === 'union') {
      const typeJsonTypes = typeJson.types;
      typeAliasTypes = typeJsonTypes.map((obj) => {
        return obj.value;
      });
    }
    return typeAliasTypes;
  }

  /**
   * A getter to get the documentation for a reflection
   * @param reflection Object with reflection properties
   * @returns
   */
  getReflectionString(reflection) {
    if (!reflection.children) {
      return '';
    }
    const children: { [x: string]: any }[] = reflection.children;
    let typeString = '{ ';
    children.map((child, i) => {
      if (child.name) {
        typeString += `${child.name}: `;
        const type = this.getAdjustedType(child.type);
        typeString += ` ${type}`;
        if (i + 1 !== children.length) {
          typeString += ', ';
        }
      }
    });
    typeString += ' }';

    return typeString;
  }

  reflectionTypeParser(typeJson: ReflectionTypeParser) {
    const children = typeJson.reflection?.children;
    if (!typeJson.reflection?.children) {
      return '';
    }
    let typeString = '{ ';
    children?.map((child, i) => {
      if (child.name) {
        typeString += `${child.name}: `;
        const type = this.getAdjustedType(child.type);
        typeString += ` ${type}`;
        if (i + 1 !== children.length) {
          typeString += ', ';
        }
      }
    });
    typeString += ' }';

    return typeString;
  }

  getSeparatorSymbol(typeKind) {
    return typeKind === 'union' ? ' | ' : typeKind === 'intersection' ? ' & ' : '';
  }

  getTypeString(
    typeObj: ReflectionTypeParser | LiteralTypeParser | ArrayTypeParser | ReferenceTypeParser | any,
    prevTypeString?: string,
  ): string {
    let finalTypeString = prevTypeString ?? '';
    if (typeObj instanceof ReferenceTypeParser) {
      if (typeObj.name === 'Promise') {
        const typeObjects = typeObj.typeArguments;
        typeObjects.reverse().map((type) => {
          finalTypeString += this.typeParser(type);
        });
      } else {
        finalTypeString += typeObj.name;
      }
    } else if (typeObj instanceof ArrayTypeParser) {
      // const arrType = typeObj.type;
      let typeString = (typeObj.type as any).name ?? (typeObj.type as any).type;

      typeString += '[ ]';

      finalTypeString += typeString;
    } else if (typeObj instanceof ReflectionTypeParser) {
      finalTypeString += this.reflectionTypeParser(typeObj);
    } else if (typeObj instanceof LiteralTypeParser) {
      finalTypeString += typeObj.value;
    } else if (typeObj instanceof IntrinsicTypeParser) {
      finalTypeString += this.getAdjustedType(typeObj);
    } else if (typeObj instanceof IntersectionTypeParser || typeObj instanceof UnionTypeParser) {
      const intersectionTypes = typeObj.types;
      let typeString = '';
      intersectionTypes.reverse()?.map((typeNew, index) => {
        typeString += this.getTypeString(typeNew);
        if (index + 1 !== intersectionTypes.length) {
          typeString += this.getSeparatorSymbol(typeObj.kind);
        }
      });
      finalTypeString += typeString;
    }

    return finalTypeString;
  }

  typeParser(typeJson) {
    const typeKind = typeJson.kind;
    let types, typeArguments;

    if (typeJson.hasOwnProperty('types')) {
      types = typeJson.types ?? undefined;
    }

    if (typeJson.hasOwnProperty('typeArguments')) {
      typeArguments = typeJson.typeArguments ?? undefined;
    }

    const isUnion = typeKind === 'union';
    const selectedTypeArray = isUnion ? (types ? types : typeArguments) : undefined;
    let returnType = '';

    if (selectedTypeArray?.length > 0 && (typeKind === 'union' || typeKind === 'intersection')) {
      selectedTypeArray.reverse().map((parameter, index: number) => {
        let typeString = this.getTypeString(parameter);
        if (index + 1 !== selectedTypeArray.length) {
          typeString += this.getSeparatorSymbol(typeKind);
        }
        returnType += typeString;
      });
    }

    const type = this.getTypeString(typeJson);
    if (!returnType) {
      returnType = type;
    }

    return returnType;
  }

  /**
   * A getter to get the interface documentation
   * @param interfaceObject Json interface object from the parsed project
   * @returns Parsed docs object for the interface if it exists, undefined otherwise
   */
  createInterfaceDocs(interfaceObject?: InterfaceParser | string): InterfaceDocs | undefined {
    let interfaceObj: InterfaceParser | undefined;
    if (typeof interfaceObject === 'string') {
      interfaceObj = this.getInterface(interfaceObject);
    } else {
      interfaceObj = interfaceObject;
    }

    if (!interfaceObj) {
      return undefined;
    }

    const properties = interfaceObj.properties.map((property) => {
      const propertyDocs = {
        label: property.name,
        description: property.comment.description ?? '',
        type: this.typeParser(property.type),
      };
      return propertyDocs;
    });

    const docs: InterfaceDocs = {
      name: interfaceObj.name,
      comments: { summary: interfaceObj.comment.description },
      params: properties,
    };

    return docs;
  }

  getAdjustedType(json: any): string {
    if (json?.name) {
      if (json?.kind === 'array') {
        return `${json?.name}[ ]`;
      }
      return json?.name;
    } else if (json?.type && json?.kind === 'array') {
      return `${json.type.name ?? json.type.type}[ ]`;
    } else if (typeof json?.type === 'string') {
      return json?.type;
    } else if (json?.type) {
      return (json.type as ParamType).type ?? json.type.kind;
    } else if (json?.value) {
      if (json?.kind === 'array') {
        return `${json?.value}[ ]`;
      }
      return json.value;
    } else {
      return json?.kind;
    }
  }

  private getClassObj = (classObject?: string | ClassParser): ClassParser | undefined => {
    let classObj: ClassParser | undefined;
    if (typeof classObject === 'string') {
      classObj = this.getClass(classObject);
    } else classObj = classObject;
    if (!classObj) return undefined;
    else return classObj;
  };

  createClassDocs(classObj: string | ClassParser) {
    let classObject: ClassParser | undefined;
    if (typeof classObj === 'string') {
      classObject = this.allClasses.find((obj) => obj.name === classObj);
    } else {
      classObject = classObj;
    }

    if (!classObject || !classObject.name) {
      return undefined;
    }

    const name = classObject.name;
    const comments = {
      summary: classObject.comment.description,
      returnSummary: this.getReturnSummary(classObject.comment.blockTags),
    };
    const properties = classObject.properties.map((property) => {
      const prop = property as any;
      const obj = {
        name: property.name,
        comments: {
          summary: property.comment.description,
          returnSummary: this.getReturnSummary(property.comment.blockTags),
        },
        type: this.typeParser(prop.type),
      };

      return obj;
    });

    const docs = {
      name,
      comments,
      properties,
    };

    return docs;
  }

  getReturnSummary(blockTags: any[]) {
    return blockTags.find((tag) => tag.name === 'returns')?.text;
  }

  createMethodDocs(methodName: string, classObject?: ClassParser | string | undefined): MethodDocs | undefined {
    const classObj = this.getClassObj(classObject);
    if (!classObj) return undefined;
    const method = this.getMethod(methodName, classObj);
    const label = this.createMethodDefinition(method);
    const name = method?.name;
    const parameters = this.createParameterDefinition(method);
    const comments = this.createCommentDocs(method);
    const returnTypes = this.createReturnTypes(method);
    const async = this.isAsyncMethod(method);
    const docs = {
      async,
      name,
      label,
      params: parameters,
      comments,
      returnTypes,
    };
    return docs;
  }

  createTypeAliasDocs(typeAliasObject: string | TypeAliasParser) {
    let typeAliasObj;
    if (typeof typeAliasObject === 'string') {
      typeAliasObj = this.getTypeAlias(typeAliasObject);
    } else {
      typeAliasObj = typeAliasObject;
    }
    if (!typeAliasObj) {
      return undefined;
    }

    const type = this.getTypeAliasType(typeAliasObj.type.toJSON());

    const docs: TypeAliasDocs = {
      name: typeAliasObj.name,
      comments: { summary: typeAliasObj.comment.description ?? '' },
      type: type,
    };
    return docs;
  }

  createAllTypeAliasJson() {
    const docs = this.allTypeAliases.map((obj) => {
      const objDocs = this.createTypeAliasDocs(obj);
      return objDocs;
    });
    return docs;
  }

  createAllInterfacesJson() {
    const docs = this.allInterfaces.map((obj) => {
      const objDocs = this.createInterfaceDocs(obj);
      return objDocs;
    });
    return docs;
  }

  createAllMethodsJson() {
    const allClasses = this.getAllClasses();
    const allMethodDocs = allClasses?.map((classObj) => {
      const className = classObj?.name;
      const classMethods = classObj.methods.map((method) => {
        const methodDocs = {
          className: classObj.name,
          data: this.createMethodDocs(method.name, className),
        };
        return methodDocs;
      });
      return classMethods;
    });
    return allMethodDocs;
  }

  createAllClassesJson() {
    const allClasses = this.getAllClasses();
    const allCalssesDocs = allClasses?.map((classObj) => {
      const classDocs = this.createClassDocs(classObj.name);
      return classDocs;
    });
    return allCalssesDocs;
  }

  createAllMethodsDocs(classObj: string | ClassParser): (MethodDocs | undefined)[] | undefined {
    let classObject: ClassParser | undefined;
    if (typeof classObj === 'string') {
      classObject = this.getClass(classObj);
    } else classObject = classObj;

    if (classObject) {
      const methods = classObject.methods;
      const methodsDocs = methods.map((method) => {
        return this.createMethodDocs(method.name, classObject);
      });
      return methodsDocs;
    }
    return undefined;
  }

  /**
   * If the method's return type is a Promise, then it's an async method
   * @param method - any | undefined
   * @returns A boolean value.
   */
  isAsyncMethod(method: ClassMethodParser | undefined): boolean {
    const json: Json | undefined = method?.signatures[0].returnType;

    if (json?.name === 'Promise') return true;
    else return false;
  }

  /**
   * It takes a string and returns an object with a label property that has the same value as the string
   * @param label - The label of the type.
   * @returns An object with a label property.
   */
  private createTypeObject(label: string) {
    return {
      label: label,
    };
  }

  /**
   * It takes a method object and returns an array of MethodReturnType objects
   * @param {any | undefined} method - any | undefined
   * @returns An array of MethodReturnType objects.
   */
  createReturnTypes(method: ClassMethodParser | undefined): MethodReturnType[] | undefined {
    const returnType: Json | undefined = method?.signatures[0].returnType;
    let typesArr;
    if (returnType?.hasOwnProperty('typeArguments') || returnType?.hasOwnProperty('types')) {
      const typeStringArr: any[] = [];
      typesArr = returnType?.types ?? returnType.typeArguments;
      if (typesArr) {
        typesArr.reverse().map((type) => {
          if (type.types) {
            type.types.reverse().map((newType) => {
              typeStringArr.push(this.getTypeString(newType));
            });
          } else {
            typeStringArr.push(this.getTypeString(type));
          }
        });
      }
      if (typeStringArr.length > 0) {
        const types = typeStringArr.map((typeString) => {
          return this.createTypeObject(typeString as string);
        });
        return types;
      }
    }

    const returnString = this.typeParser(returnType);
    const types = this.createTypeObject(returnString);
    return [types];
  }

  /**
   * It takes a method and returns an object with the method's summary and return summary
   * @param {any | undefined} method - any | undefined
   * @returns An object with the summary and returnSummary properties.
   */
  private createCommentDocs(method: ClassMethodParser | undefined) {
    const comments = method?.signatures[0].comment;
    const summary = comments?.description;
    const returnSummary = comments?.blockTags.find((tag) => tag.name === 'returns')?.text;
    const commentDocs = {
      summary,
      returnSummary,
    };

    return commentDocs;
  }

  /**
   * It takes a method from the parsed documentation and returns an array of objects that contain the
   * name, type, and description of each parameter
   * @param method - any | undefined
   * @returns An array of objects with the following properties:
   * - label
   * - type
   * - description
   */
  private createParameterDefinition(method: ClassMethodParser | undefined): MethodParamTypes[] {
    const parameters = method?.signatures[0].parameters;
    /*eslint-disable */
    let parsedParameters: { label: string; type?: string | string[] | undefined; description?: string | null }[] = []; // eslint-disable-line no-use-before-define
    /*eslint-enable */
    /* It's iterating over the parameters array and creating an object for each parameter. */
    parameters?.forEach((parameter) => {
      const obj = {
        label: parameter.name,
        type: this.typeParser(parameter.type),
        description: parameter.comment.description,
      };
      parsedParameters.push(obj);
    });
    return parsedParameters;
  }

  /**
   * It takes a method object and returns a string that represents the method's signature
   * @param method - any | undefined
   * @returns A string that is a method definition.
   */
  private createMethodDefinition(method: any | undefined) {
    let methodDefinition = '';
    const methodSignature = method?.signatures[0];
    const parameters = method?.signatures[0].parameters;
    const returnType = method?.signatures[0].returnType;
    methodDefinition += `${methodSignature?.name}(`;

    let parameterString = '';
    parameterString += parameters?.map((parameter) => {
      let parameterDefinition = '';
      parameterDefinition += ` ${parameter.name}`;
      // const json: Json = parameter.type;
      const parameterType = this.typeParser(parameter.type);
      parameterDefinition += `: ${parameterType}`;
      return parameterDefinition;
    });
    methodDefinition += parameterString + ' )';

    let returnString = ': ';
    if (returnType?.name === 'Promise') {
      returnString += 'Promise< ';
      returnString += this.typeParser(returnType);
      returnString += ' >';
    } else {
      returnString += this.typeParser(returnType);
    }
    if (returnString !== ': ') methodDefinition += returnString;
    return methodDefinition;
  }
}
export default new DocGenerator();

const docs = new DocGenerator();
docs.createAllDocsJson();

// Convert examples to json
const exampleDirectory = './src/examples/';
const exampleJsonFile = './codeExamples.json';

export function convertExamplesToJson(dirname: string) {
  fs.readdir(dirname, function (err, filenames) {
    const data: any[] = [];

    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach(function (filename) {
      const content = fs.readFileSync(dirname + filename, 'utf-8');
      const className = filename.split('-')[0];
      let methodName = filename.split('-')[1];
      if (methodName && methodName !== '.js') {
        methodName = methodName.split('.')[0];

        const obj = {
          [`${className}.${methodName}`]: content,
        };
        data.push(obj);
      }
    });
    fs.writeFileSync(exampleJsonFile, JSON.stringify(data));
  });
}

convertExamplesToJson(exampleDirectory);
