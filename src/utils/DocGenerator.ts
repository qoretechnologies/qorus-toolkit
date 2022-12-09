import docData from '../docs/parsedProjectDocumentation.json';

export interface MethodDocs {
  async: boolean;
  name: string | undefined;
  label: string | undefined;
  params: MethodParamTypes[];
  comments: {
    summary: string | null | undefined;
    returnSummary: string | null | undefined;
  };
  returnTypes: MethodReturnType[] | undefined;
}

export interface MethodComment {
  summary: string;
  returnSummary: string;
}

export interface MethodParamTypes {
  label?: string | undefined;
  type?: string | null | undefined;
  description?: string | null | undefined;
}

export interface MethodReturnType {
  label: string;
}

class DocGenerator {
  project: any;
  allClasses;
  allInterfaces;

  constructor() {
    this.project = JSON.parse(JSON.stringify(docData));
    let classObj: any[] = [];

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

  getClass(className: string): any | undefined {
    return this.allClasses.find((classObj) => classObj.name === className);
  }

  //   getInterface(interfaceName: string): any | undefined {
  //     return;
  //   }

  getAllInterfaces(): any[] | undefined {
    return this.allInterfaces;
  }

  getAllClasses(): any[] | undefined {
    return this.allClasses;
  }

  getAllMethodsDocs(classObj: string | any): any[] | undefined {
    let classObject;
    if (typeof classObj === 'string') {
      classObject = this.getClass(classObj);
    } else classObject = classObj;

    if (classObject) {
      const methods = classObject.methods;
      const methodsDocs = methods.map((method) => {
        return this.getMethodDocs(method.name as string, classObject);
      });
      return methodsDocs;
    }
    return undefined;
  }

  getClassDocs(classObj: string | any) {
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

  private GetClassObj = (classObject?: string | any) => {
    let classObj;
    if (typeof classObject === 'string') {
      classObj = this.getClass(classObject);
    } else classObj = classObject;
    if (!classObj) return undefined;
    else return classObj;
  };

  getMethodDocs(methodName: string, classObject?: any | string | undefined): MethodDocs | undefined {
    const classObj = this.GetClassObj(classObject);
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

  isAsyncMethod(method: any | undefined): boolean {
    const json: Json | undefined = method?.signatures[0].returnType;

    if (json?.name === 'Promise') return true;
    else return false;
  }

  getMethod(methodName: string, classObj: any | undefined): any | undefined {
    if (!classObj) return undefined;
    return classObj.methods?.find((method) => method.name === methodName);
  }

  private createTypeObject(label: string) {
    return {
      label: label,
    };
  }

  createReturnTypes(method: any | undefined): MethodReturnType[] | undefined {
    const returnType: Json | undefined = method?.signatures[0].returnType;
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

  private createCommentDocs(method: any | undefined) {
    const comments = method?.signatures[0].comment;
    const summary = comments?.description;
    const returnSummary = comments?.blockTags.find((tag) => tag.name === 'returns')?.text;
    const commentDocs = {
      summary,
      returnSummary,
    };

    return commentDocs;
  }

  private createParameterDefinition(method: any | undefined): MethodParamTypes[] {
    const parameters = method?.signatures[0].parameters;
    /*eslint-disable */
    let parsedParameters: { label?: string; type?: string | null; description?: string | null }[] = []; // eslint-disable-line no-use-before-define
    /*eslint-enable */
    parameters?.forEach((parameter) => {
      const json: Json | undefined = parameter?.type;

      const obj = {
        label: parameter.name,
        type: json?.name ?? json?.type ?? json?.kind,
        description: parameter.comment.description,
      };
      parsedParameters.push(obj);
    });
    return parsedParameters;
  }

  private createMethodDefinition(method: any | undefined) {
    let methodDefinition = '';
    const methodSignature = method?.signatures[0];
    const parameters = method?.signatures[0].parameters;
    const returnType = method?.signatures[0].returnType;
    methodDefinition += `${methodSignature?.name}(`;

    let parameterString = '';
    parameterString += parameters?.map((parameter) => {
      let parameterDefinition = '';
      parameterDefinition += `' '${parameter.name}`;
      const json: Json = parameter.type;
      const parameterType = json.name ? json.name : json.type ? json.type : json.kind;
      parameterDefinition += ': ' + parameterType;
      return parameterDefinition;
    });
    methodDefinition += parameterString + ' )';

    let returnString = ': ';
    const json: Json | undefined = returnType;

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
export default new DocGenerator();

interface Json {
  kind: Kind;
  name?: string;
  type?: string;
  types?: {
    kind: string;
    type?: string;
    name?: string;
  }[];
  typeArguments?: {
    kind: Kind;
    types?: { kind: Kind; type: string; name?: string }[];
    type?: string;
  }[];
}

enum Kind {
  Array = 'array',
  Conditional = 'conditional',
  IndexedAccess = 'indexedAccess',
  Inferred = 'inferred',
  Intersection = 'intersection',
  Intrinsic = 'intrinsic',
  Literal = 'literal',
  Mapped = 'mapped',
  NamedTupleMember = 'namedTupleMember',
  Optional = 'optional',
  Predicate = 'predicate',
  Query = 'query',
  Reference = 'reference',
  Reflection = 'reflection',
  Rest = 'rest',
  TemplateLiteral = 'templateLiteral',
  Tuple = 'tuple',
  TypeOperator = 'typeOperator',
  Union = 'union',
  Unknown = 'unknown',
}
