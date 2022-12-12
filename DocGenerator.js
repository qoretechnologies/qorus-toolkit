const fs = require('fs');
const JsonParser = require('typedoc-json-parser');
const ProjectParser = JsonParser.ProjectParser;
const parsedProjectDocs = './docs/parsedProjectDocumentation.json';
const typedocDocs = './docs/documentation.json';

class DocGenerator {
  project;
  allClasses = [];
  allInterfaces = [];

  constructor() {
    // Reading docs generated by typedoc
    const raw = fs.readFileSync(typedocDocs, { encoding: 'utf-8' });
    // Converting to JSON
    const parsedData = JSON.parse(raw);
    const projectData = new ProjectParser({ data: parsedData });
    this.project = projectData;

    let classObj = [];
    this.project.namespaces?.forEach((namespace) => {
      classObj = [...classObj, ...namespace.classes];
    });
    this.allClasses = classObj;

    // let interfaceObject;
    // this.project.namespaces.forEach((namespace) => {
    //   interfaceObject = [...interfaceObject, ...namespace.interfaces];
    // });
    // this.allInterfaces = interfaceObject;
  }

  getProject() {
    return this.project;
  }

  getClass(className) {
    return this.allClasses.find((classObj) => classObj.name === className);
  }

  //   getInterface(interfaceName: string): any | undefined {
  //     return;
  //   }

  getAllInterfaces() {
    return this.allInterfaces;
  }

  getAllClasses() {
    return this.allClasses;
  }

  createAllDocsJson() {
    const classesDocs = this.createAllClassesJson();
    const methodDocs = this.createAllMethodsJson();
    // Writing parsed project data to file
    fs.writeFileSync(parsedProjectDocs, JSON.stringify({ classesDocs, methodDocs }));
    return {
      classesDocs,
      methodDocs,
    };
  }

  createAllMethodsJson() {
    const allClasses = this.getAllClasses();
    const allMethodDocs = allClasses?.map((classObj) => {
      const className = classObj?.name;
      const classMethods = classObj.methods.map((method) => {
        const methodDocs = {
          className: classObj.name,
          data: this.getMethodDocs(method.name, className),
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
      const classDocs = this.getClassDocs(classObj.name);
      return classDocs;
    });
    return allCalssesDocs;
  }

  createAllMethodsDocs(classObj) {
    let classObject;
    if (typeof classObj === 'string') {
      classObject = this.getClass(classObj);
    } else classObject = classObj;

    if (classObject) {
      const methods = classObject.methods;
      const methodsDocs = methods.map((method) => {
        return this.getMethodDocs(method.name, classObject);
      });
      return methodsDocs;
    }
    return undefined;
  }

  getClassDocs(classObj) {
    let classObject;
    if (typeof classObj === 'string') {
      classObject = this.allClasses.find((obj) => obj.name === classObj);
    } else classObject = classObj;

    if (!classObject.name) {
      return undefined;
    }

    const name = classObject.name;
    const comment = {
      description: classObject.comment.description,
      blockTags: classObject.comment.blockTags,
    };
    const properties = classObject.properties.map((property) => {
      const obj = {
        name: property.name,
        comment: {
          description: property.comment.description,
          blockTags: property.comment.blockTags,
        },
        type: {
          kind: property.type.kind,
          name: property.type.name ?? property.type.type,
        },
      };

      return obj;
    });

    const docs = {
      name,
      comment,
      properties,
    };

    return docs;
  }

  getClassObj = (classObject) => {
    let classObj;
    if (typeof classObject === 'string') {
      classObj = this.getClass(classObject);
    } else classObj = classObject;
    if (!classObj) return undefined;
    else return classObj;
  };

  getMethodDocs(methodName, classObject) {
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

  /**
   * If the method's return type is a Promise, then it's an async method
   * @param {any | undefined} method - any | undefined
   * @returns A boolean value.
   */
  isAsyncMethod(method) {
    const json = method?.signatures[0].returnType;

    if (json?.name === 'Promise') return true;
    else return false;
  }

  /**
   * If the classObj is not undefined, return the method with the given name from the classObj's
   * methods array, or undefined if no such method exists.
   * @param {string} methodName - The name of the method you want to find.
   * @param {any | undefined} classObj - The class object that you want to search for the method in.
   * @returns The method object with the name that matches the methodName parameter.
   */
  getMethod(methodName, classObj) {
    if (!classObj) return undefined;
    return classObj.methods?.find((method) => method.name === methodName);
  }

  /**
   * It takes a string and returns an object with a label property that has the same value as the string
   * @param {string} label - The label of the type.
   * @returns An object with a label property.
   */
  createTypeObject(label) {
    return {
      label: label,
    };
  }

  /**
   * It takes a method object and returns an array of MethodReturnType objects
   * @param {any | undefined} method - any | undefined
   * @returns An array of MethodReturnType objects.
   */
  createReturnTypes(method) {
    const returnType = method?.signatures[0].returnType;
    if (returnType?.kind === 'union') {
      const types = returnType.types?.map((type) => {
        const obj = this.createTypeObject(type.name ?? type.type ?? type.kind);
        return obj;
      });
      return types;
    }
    const typeArguments = returnType?.typeArguments?.[0];

    if (typeArguments?.kind === 'union') {
      const reversedTypes = typeArguments.types?.reverse();
      const types = reversedTypes?.map((type) => {
        const obj = this.createTypeObject(type.name ?? type.type ?? type.kind);
        return obj;
      });
      return types;
    }

    const types = this.createTypeObject(typeArguments?.type ?? typeArguments?.kind ?? '');
    return [types];
  }

  /**
   * It takes a method and returns an object with the method's summary and return summary
   * @param {any | undefined} method - any | undefined
   * @returns An object with the summary and returnSummary properties.
   */
  createCommentDocs(method) {
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
   * @param {any | undefined} method - any | undefined
   * @returns An array of objects with the following properties:
   * - label
   * - type
   * - description
   */
  createParameterDefinition(method) {
    const parameters = method?.signatures[0].parameters;
    /*eslint-disable */
    let parsedParameters = []; // eslint-disable-line no-use-before-define
    /*eslint-enable */

    /* It's iterating over the parameters array and creating an object for each parameter. */
    parameters?.forEach((parameter) => {
      const json = parameter?.type;

      const obj = {
        label: parameter.name,
        type: json?.name ?? json?.type ?? json?.kind,
        description: parameter.comment.description,
      };
      parsedParameters.push(obj);
    });
    return parsedParameters;
  }

  /**
   * It takes a method object and returns a string that represents the method's signature
   * @param {any | undefined} method - any | undefined
   * @returns A string that is a method definition.
   */
  createMethodDefinition(method) {
    let methodDefinition = '';
    const methodSignature = method?.signatures[0];
    const parameters = method?.signatures[0].parameters;
    const returnType = method?.signatures[0].returnType;
    methodDefinition += `${methodSignature?.name}(`;

    let parameterString = '';
    parameterString += parameters?.map((parameter) => {
      let parameterDefinition = '';
      parameterDefinition += `' '${parameter.name}`;
      const json = parameter.type;
      const parameterType = json.name ? json.name : json.type ? json.type : json.kind;
      parameterDefinition += ': ' + parameterType;
      return parameterDefinition;
    });
    methodDefinition += parameterString + ' )';

    let returnString = ': ';
    const json = returnType;

    if (json?.name === 'Promise') {
      returnString += 'Promise< ';
      if (json.typeArguments?.[0].kind === 'union') {
        const reversedTypes = json.typeArguments?.[0].types?.reverse();
        reversedTypes?.map((type, index) => {
          returnString += type.name ? type.name : type.type;
          if (index + 1 !== json.typeArguments?.[0].types?.length) returnString += ' | ';
          if (index + 1 === json.typeArguments?.[0].types?.length) returnString += ' >';
        });
      } else {
        const reversedTypes = json.typeArguments?.reverse();
        reversedTypes?.map((type) => {
          returnString += type.type;
          returnString += ' >';
        });
      }
    }
    if (json?.kind === 'union') {
      const reversedTypes = json.types?.reverse();
      reversedTypes?.map((type, index) => {
        returnString += type.name ? type.name : type.type;
        if (index + 1 !== json.types?.length) returnString += ' | ';
      });
    }
    if (json?.kind === 'reference' && json?.name !== 'Promise') {
      returnString += json.name;
    }
    if (returnString !== ': ') methodDefinition += returnString;
    return methodDefinition;
  }
}
// export default new DocGenerator();

const docs = new DocGenerator();
docs.createAllDocsJson();
