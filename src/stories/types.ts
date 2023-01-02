import { TReqoreIntent } from '@qoretechnologies/reqore/dist/constants/theme';
import { Meta, Story } from '@storybook/react';

export interface IDocumentationParam {
  // TODO: Type is now optional but needs to be REQUIRED in the future
  label: string;
  link?: string;
  description?: string;
  optional?: boolean;
  type?: string;
}
export interface IDocumentationReturns {
  label: string;
  link?: string;
  intent?: TReqoreIntent;
}

type TTDocumentationParams = Record<string, IDocumentationParam>;
type TTDocumentationReturns = {
  description: string;
  types: IDocumentationReturns[];
};
type TTDocumentationLabel = string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;

export interface IDocumentationProps extends IMethodDocs {}

export interface IDocumentationMeta extends Meta<IDocumentationProps> {}
export interface IDocumentationStory extends Story<IDocumentationProps> {}

export interface IDocumentationProperty {
  name: string;
  comments?: IComments;
  type: string | string[];
}

export interface IDocumentationClass {
  name: string;
  properties: IDocumentationProperty[];
  methods?: IMethodDocs[];
  comments: IComments;
}

export interface IMethodDocs {
  async: boolean;
  name: string | undefined;
  label: string | undefined;
  params: IMethodParamTypes[];
  comments: IComments;
  returnTypes: IMethodReturnType[] | undefined;
  accessibility: string | undefined;
}

export interface IMethodJson {
  className: string;
  data: IMethodDocs[] | undefined;
}

export interface InterfaceDocsProperties {
  label: string;
  description?: string | null;
  type?: string | string[];
}

export interface InterfaceDocs {
  name: string;
  comments?: { summary: string | null };
  params?: InterfaceDocsProperties[];
}

export interface ITypeAliasDocs {
  name: string;
  comments?: { summary: string | null };
  type?: string | string[];
}

export interface IComments {
  summary: string | undefined | null;
  returnSummary?: string | undefined;
}

export interface IMethodParamTypes {
  label: string;
  type?: string | undefined | any;
  description?: string | undefined | null;
}

export interface IMethodReturnType {
  label: string;
}

export interface IParamType {
  kind: string;
  type: string;
}

export interface IJson {
  kind: Kind;
  name?: string;
  type?: IParamType | string;
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

// export interface IDocumentationData {}
