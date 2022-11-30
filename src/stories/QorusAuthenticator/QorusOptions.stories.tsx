import { ReqoreSpacer } from '@qoretechnologies/reqore';
import React from 'react';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/Options',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ content, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Options"
      description="Provider options handler"
      code="import { QorusOptions } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{content}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const getAll = Template.bind({});
getAll.storyName = 'getAll';
getAll.args = {
  label: 'getAll( qorusRequestParams, endpoint )',
  params: {
    qorusRequestParams: { label: 'QorusRequestParams', link: 'QorusRequestParams' },
    endpoint: { label: 'Endpoint' },
  },
  returns: [{ label: 'Properties : { [ x : string ]: { } } ' }],
  content: <>Get list of properties required for the provider.</>,
};

export const getType = Template.bind({});
getType.storyName = 'getType';
getType.args = {
  label: 'getType( propertyName )',
  params: {
    propertyName: { label: 'string' },
  },
  returns: [{ label: '[ TypeString ] : string [ ]' }],
  content: (
    <>
      A getter to get property type.
      <br /> Returns array of property types acceptable by the property
    </>
  ),
};

export const put = Template.bind({});
put.storyName = 'put';
put.args = {
  label: 'put( qorusRequestParams, endpoint )',
  params: {
    qorusRequestParams: { label: 'QorusRequestParams', link: 'QorusRequestParams' },
    endpoint: { label: 'Endpoint' },
  },
  returns: [{ label: 'Promise<T | undefined>' }, { label: 'undefined' }],
  content: (
    <>
      Put request creator,Returns the response of a put request from the server as json. If the operation fails it
      throws an error or returns undefined. If the optional endpoint parameter is provided, QorusRequest will make
      request to that connection instead of the one currently selected.
    </>
  ),
};

export const deleteReq = Template.bind({});
deleteReq.storyName = 'deleteReq';
deleteReq.args = {
  label: 'deleteReq( qorusRequestParams, endpoint )',
  params: {
    qorusRequestParams: { label: 'QorusRequestParams', link: 'QorusRequestParams' },
    endpoint: { label: 'Endpoint' },
  },
  returns: [{ label: 'Promise<T | undefined>' }, { label: 'undefined' }],
  content: (
    <>
      Delete request creator, returns the response of a deleteReq request from the server as json. If the operation
      fails it throws an error or returns undefined. If the optional endpoint parameter is provided, QorusRequest will
      make request to that connection instead of the one currently selected.
    </>
  ),
};
