import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/Request',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ content, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Request"
      description="HTTP Request manager for Qorus Toolkit"
      code="import { QorusRequest } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{content}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const get = Template.bind({});
get.storyName = 'get';
get.args = {
  label: 'get( qorusRequestParams, endpoint )',
  params: {
    qorusRequestParams: { label: 'QorusRequestParams', link: 'QorusRequestParams' },
    endpoint: { label: 'Endpoint' },
  },
  returns: [{ label: 'Promise<T | undefined>' }, { label: 'undefined' }],
  content: (
    <>
      Get request creator,Returns the response of a get request from the server as json. If the operation fails it
      throws an error or returns undefined. If the optional endpoint parameter is provided, QorusRequest will make
      request to that connection instead of the one currently selected.
    </>
  ),
};

export const post = Template.bind({});
post.storyName = 'post';
post.args = {
  label: 'post( qorusRequestParams, endpoint )',
  params: {
    qorusRequestParams: { label: 'QorusRequestParams', link: 'QorusRequestParams' },
    endpoint: { label: 'Endpoint' },
  },
  returns: [{ label: 'Promise<T | undefined>' }, { label: 'undefined' }],
  content: (
    <>
      Post request creator,Returns the response of a post request from the server as json. If the operation fails it
      throws an error or returns undefined. If the optional endpoint parameter is provided, QorusRequest will make
      request to that connection instead of the one currently selected.
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
