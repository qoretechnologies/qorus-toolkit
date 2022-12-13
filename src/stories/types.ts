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

export type TDocumentationParams = Record<string, IDocumentationParam>;
export type TDocumentationReturns = {
  description: string;
  types: IDocumentationReturns[];
};
export type TDocumentationLabel =
  | string
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | undefined;

export interface IDocumentationProps extends MethodDocs {}

export interface DocumentationMeta extends Meta<IDocumentationProps> {}
export interface DocumentationStory extends Story<IDocumentationProps> {}

export interface DocumentationProperty {
  name: string;
}

export interface DocumentationClass {
  name: string;
  properties: DocumentationProperty[];
  comment: {
    description?: string | null;
    blockTags?: {
      name: string | null;
      text: string | null;
    }[];
  };
}
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
  label: string;
  type?: string | undefined | any;
  description?: string | undefined | null;
}

export interface MethodReturnType {
  label: string;
}

export interface ParamType {
  kind: string;
  type: string;
}

export interface Json {
  kind: Kind;
  name?: string;
  type?: ParamType | string;
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

// export interface DocumentationData {}
