import { Documentation } from '../components/documentation';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';
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
    >
      <QorusAuthenticatorDemo />
    </Documentation>
  );
};

const prepareStory = newMethodStory(Template, 'QorusAuthenticator');

export const addEndpoint = prepareStory('addEndpoint');
addEndpoint.storyName = 'addEndpoint';

export const login = prepareStory('login');
login.storyName = 'login';

export const logout = prepareStory('logout');
logout.storyName = 'logout';

export const checkNoAuth = prepareStory('checkNoAuth');
checkNoAuth.storyName = 'checkNoAuth';

export const getAllEndpoints = prepareStory('getAllEndpoints');
getAllEndpoints.storyName = 'getAllEndpoints';

export const getApiPaths = prepareStory('getApiPaths');
getApiPaths.storyName = 'getApiPaths';

export const getAuthToken = prepareStory('getAuthToken');
getAuthToken.storyName = 'getAuthToken';

export const getEndpointById = prepareStory('getEndpointById');
getEndpointById.storyName = 'getEndpointById';

export const getEndpointVersion = prepareStory('getEndpointVersion');
getEndpointVersion.storyName = 'getEndpointVersion';

export const getSelectedEndpoint = prepareStory('getSelectedEndpoint');
getSelectedEndpoint.storyName = 'getSelectedEndpoint';

export const selectEndpoint = prepareStory('selectEndpoint');
selectEndpoint.storyName = 'selectEndpoint';

export const setEndpointUrl = prepareStory('setEndpointUrl');
setEndpointUrl.storyName = 'setEndpointUrl';

export const setEndpointVersion = prepareStory('setEndpointVersion');
setEndpointVersion.storyName = 'setEndpointVersion';

export const validateEndpointData = prepareStory('validateEndpointData');
validateEndpointData.storyName = 'validateEndpointData';

export const validateLocalUserToken = prepareStory('validateLocalUserToken');
validateLocalUserToken.storyName = 'validateLocalUserToken';

export const renewSelectedEndpointToken = prepareStory('renewSelectedEndpointToken');
renewSelectedEndpointToken.storyName = 'renewSelectedEndpointToken';
