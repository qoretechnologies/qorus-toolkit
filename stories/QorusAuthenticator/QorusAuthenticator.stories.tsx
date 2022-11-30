import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationType } from '../components/type';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/Authenticator',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ content, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Authenticator"
      description="Helper for authentication"
      code="import { QorusAuthenticator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{content}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const getEndpointById = Template.bind({});
getEndpointById.storyName = 'getEndpointById';
getEndpointById.args = {
  label: 'getEndpointById( id )',
  params: { id: { label: 'string' } },
  returns: [{ label: 'Endpoint', link: 'Endpoint' }, { label: 'undefined' }],
  content: (
    <>
      Returns the <DocumentationType link={'Endpoint'} label="Endpoint" /> if the endpoint with the supplied{' '}
      <DocumentationType label="id" /> exist in the endpoints array, <DocumentationType label="undefined" /> otherwise.
    </>
  ),
};

export const getAllEndpoints = Template.bind({});
getAllEndpoints.storyName = 'getAllEndpoints';
getAllEndpoints.args = {
  label: 'getAllEndpoints()',
  returns: [{ label: 'Endpoint[]', link: 'Endpoint' }],
  content: (
    <>
      Returns all of the <DocumentationType link={'Endpoint'} label="Endpoint" />
      s.
    </>
  ),
};
