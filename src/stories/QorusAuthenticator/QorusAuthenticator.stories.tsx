import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationTip } from '../components/tip';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newStory } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/QorusAuthenticator/Methods',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  const {
    name,
    comment: { description },
  } = getClassData('QorusAuthenticator');

  return (
    <DocumentationWrapper
      title={name}
      description={description || undefined}
      code="import { QorusAuthenticator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary}</DocumentationItem>
      <DocumentationTip>Note: there is no check whether the provided endpoint is valid or not</DocumentationTip>
      <ReqoreSpacer height={20} />
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};
const prepareStory = newStory(Template, 'QorusAuthenticator');

export const addEndpoint = prepareStory('addEndpoint');
export const login = prepareStory('login');
export const validateVersion = prepareStory('validateVersion');
export const validateLocalUserToken = prepareStory('validateLocalUserToken');
export const validateEndpointData = prepareStory('validateEndpointData');
export const setEndpointVersion = prepareStory('setEndpointVersion');
export const setEndpointUrl = prepareStory('setEndpointUrl');
export const selectEndpoint = prepareStory('selectEndpoint');
export const renewSelectedEndpointToken = prepareStory('renewSelectedEndpointToken');
export const logout = prepareStory('logout');
export const getSelectedEndpoint = prepareStory('getSelectedEndpoint');
export const getEndpointVersion = prepareStory('getEndpointVersion');
export const getEndpointById = prepareStory('getEndpointById');
export const getAuthToken = prepareStory('getAuthToken');
export const getApiPaths = prepareStory('getApiPaths');
export const checkNoAuth = prepareStory('checkNoAuth');
