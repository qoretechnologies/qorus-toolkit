import { Documentation } from '../components/documentation';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newClassPropertyStory } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/QorusAuthenticator/Properties',
  id: 'QorusAuthenticator.properties',
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
const prepareStory = newClassPropertyStory(Template, 'QorusAuthenticator');

export const allApiPaths = prepareStory('allApiPaths');
allApiPaths.storyName = 'allApiPaths';

export const apiPathsAuthenticator = prepareStory('apiPathsAuthenticator');
apiPathsAuthenticator.storyName = 'apiPathsAuthenticator';

export const endpoints = prepareStory('endpoints');
endpoints.storyName = 'endpoints';

export const selectedEndpoint = prepareStory('selectedEndpoint');
selectedEndpoint.storyName = 'selectedEndpoint';
