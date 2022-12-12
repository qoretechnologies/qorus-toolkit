export interface MethodDocs {
  async: boolean;
  name: string | undefined;
  label: string | undefined;
  params: MethodParamTypes[];
  comments: MethodComment;
  returnTypes: MethodReturnType[] | undefined;
}

export interface MethodComment {
  summary: string | undefined | null;
  returnSummary?: string | undefined;
}

export interface MethodParamTypes {
  label?: string | undefined;
  type?: string | undefined | any;
  description?: string | undefined | null;
}

export interface MethodReturnType {
  label: string;
}

export interface Json {
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

export enum Kind {
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
