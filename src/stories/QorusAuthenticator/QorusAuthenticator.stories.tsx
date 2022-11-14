import { ReqorePanel } from '@qoretechnologies/reqore';
import ReactRunkit from 'react-runkit';
import { version } from '../../../pullRequestRelease.json';
import { DocumentationItem } from '../components/item';
import { DocumentationType } from '../components/type';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData } from '../utils';

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
      <ReqorePanel label="Example" flat headerSize={3} collapsible isCollapsed>
        <ReactRunkit
          source="console.log('test')"
          nodeVersion="16"
          preamble={`const Qorus = require('@qoretechnologies/qorus-toolkit@${version}')`}
        />
      </ReqorePanel>
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
