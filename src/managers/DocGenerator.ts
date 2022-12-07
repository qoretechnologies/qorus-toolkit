import { ClassMethodParser, ClassParser, ProjectParser } from 'typedoc-json-parser';
import docData from '../../docs/final.json';

interface MethodDocs {
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

interface MethodParamTypes {
  label?: string | undefined;
  type?: string | null | undefined;
  description?: string | null | undefined;
}

interface MethodReturnType {
  label: string;
}

class DocGenerator {
  project: ProjectParser;
  allClasses;

  constructor() {
    const data = JSON.parse(JSON.stringify(docData));
    this.project = new ProjectParser({ data });
    let classObj: ClassParser[] = [];

    this.project.namespaces.forEach((namespace) => {
      classObj = [...classObj, ...namespace.classes];
    });
    this.allClasses = classObj;
  }
  getProject() {
    return this.project;
  }

  getClass(className: string): ClassParser | undefined {
    return this.allClasses.find((classObj) => classObj.name === className);
  }

  getAllClasses(): ClassParser[] | undefined {
    return this.allClasses;
  }

  getMethodDocs(methodName: string, classObject?: string | ClassParser | undefined): MethodDocs {
    const classObj = (classObject as ClassParser) ?? this.getClass((classObject as string) ?? '') ?? undefined;
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

  isAsyncMethod(method: ClassMethodParser | undefined): boolean {
    const json: Json | undefined = method?.signatures[0].returnType?.toJSON();

    if (json?.name === 'Promise') return true;
    else return false;
  }

  getMethod(methodName: string, classObj: ClassParser | undefined): ClassMethodParser | undefined {
    if (!classObj) return undefined;
    return classObj.methods.find((method) => method.name === methodName);
  }

  private createTypeObject(label: string) {
    return {
      label: label,
    };
  }

  createReturnTypes(method: ClassMethodParser | undefined): MethodReturnType[] | undefined {
    const returnType: Json | undefined = method?.signatures[0].returnType.toJSON();
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

  private createParameterDefinition(method: ClassMethodParser | undefined): MethodParamTypes[] {
    const parameters = method?.signatures[0].parameters;
    /*eslint-disable */
    let parsedParameters: { label?: string; type?: string | null; description?: string | null }[] = []; // eslint-disable-line no-use-before-define
    /*eslint-enable */
    parameters?.forEach((parameter) => {
      const json: Json | undefined = parameter?.type.toJSON();

      const obj = {
        label: parameter.name,
        type: json.name ?? json.type ?? json.kind,
        description: parameter.comment.description,
      };
      parsedParameters.push(obj);
    });
    return parsedParameters;
  }

  private createMethodDefinition(method: ClassMethodParser | undefined) {
    let methodDefinition = '';
    const methodSignature = method?.signatures[0];
    const parameters = method?.signatures[0].parameters;
    const returnType = method?.signatures[0].returnType;
    methodDefinition += `${methodSignature?.name}(`;

    let parameterString = '';
    parameterString += parameters?.map((parameter) => {
      let parameterDefinition = '';
      parameterDefinition += ' ' + parameter.name;
      const json: Json = parameter.type.toJSON();
      const parameterType = json.name ? json.name : json.type ? json.type : json.kind;
      parameterDefinition += ': ' + parameterType;
      return parameterDefinition;
    });
    methodDefinition += parameterString + ' )';

    let returnString = ': ';
    const json: Json | undefined = returnType?.toJSON();

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
