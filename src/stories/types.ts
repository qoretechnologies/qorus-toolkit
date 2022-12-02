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
export type TDocumentationReturns = IDocumentationReturns[];
export type TDocumentationLabel =
  | string
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | undefined;

export interface IDocumentationProps {
  label: TDocumentationLabel;
  params?: TDocumentationParams;
  returns?: TDocumentationReturns;
  content: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export interface DocumentationMeta extends Meta<IDocumentationProps> {}
export interface DocumentationStory extends Story<IDocumentationProps> {}

export interface DocumentationData {}
