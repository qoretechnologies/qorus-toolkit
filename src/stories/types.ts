import { TReqoreIntent } from '@qoretechnologies/reqore/dist/constants/theme';
import { Meta, Story } from '@storybook/react';
import { MethodDocs } from '../utils/DocGenerator';

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

// export interface DocumentationData {}
