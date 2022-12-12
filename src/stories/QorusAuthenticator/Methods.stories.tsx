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
    comment: { description },
  } = getClassData('QorusAuthenticator');

  return (
    <Documentation
      {...rest}
      itemName={rest.name}
      name={name}
      description={description || undefined}
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
