import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareStory } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/Authenticator',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Authenticator"
      description="Helper for authentication"
      code="import { QorusAuthenticator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};
const className = 'QorusAuthenticator';

export const addEndpoint = prepareStory(Template, 'addEndpoint', className);
export const login = prepareStory(Template, 'login', className);
export const validateVersion = prepareStory(Template, 'validateVersion', className);
export const validateLocalUserToken = prepareStory(Template, 'validateLocalUserToken', className);
export const validateEndpointData = prepareStory(Template, 'validateEndpointData', className);
export const setEndpointVersion = prepareStory(Template, 'setEndpointVersion', className);
export const setEndpointUrl = prepareStory(Template, 'setEndpointUrl', className);
export const selectEndpoint = prepareStory(Template, 'selectEndpoint', className);
export const renewSelectedEndpointToken = prepareStory(Template, 'renewSelectedEndpointToken', className);
export const logout = prepareStory(Template, 'logout', className);
export const getSelectedEndpoint = prepareStory(Template, 'getSelectedEndpoint', className);
export const getEndpointVersion = prepareStory(Template, 'getEndpointVersion', className);
export const getEndpointById = prepareStory(Template, 'getEndpointById', className);
export const getAuthToken = prepareStory(Template, 'getAuthToken', className);
export const getApiPaths = prepareStory(Template, 'getApiPaths', className);
export const checkNoAuth = prepareStory(Template, 'checkNoAuth', className);
