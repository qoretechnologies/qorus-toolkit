import { Documentation } from '../components/documentation';
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
    comments: { summary },
  } = getClassData('QorusAuthenticator');

  return (
    <Documentation
      {...rest}
      itemName={rest.name}
      name={name}
      description={summary || undefined}
      summary={comments.summary}
      story={context.story}
      tip={'This is a tip'}
    >
      <QorusAuthenticatorDemo />
    </Documentation>
  );
};

const prepareStory = newStory(Template, 'QorusAuthenticator');

export const addEndpoint = prepareStory('addEndpoint');
export const login = prepareStory('login');
export const logout = prepareStory('logout');
export const checkNoAuth = prepareStory('checkNoAuth');
export const getAllEndpoints = prepareStory('getAllEndpoints');
export const getApiPaths = prepareStory('getApiPaths');
export const getAuthToken = prepareStory('getAuthToken');
export const getEndpointById = prepareStory('getEndpointById');
export const getEndpointVersion = prepareStory('getEndpointVersion');
export const getSelectedEndpoint = prepareStory('getSelectedEndpoint');
export const selectEndpoint = prepareStory('selectEndpoint');
export const setEndpointUrl = prepareStory('setEndpointUrl');
export const setEndpointVersion = prepareStory('setEndpointVersion');
export const validateEndpointData = prepareStory('validateEndpointData');
export const validateLocalUserToken = prepareStory('validateLocalUserToken');
export const renewSelectedEndpointToken = prepareStory('renewSelectedEndpointToken');
