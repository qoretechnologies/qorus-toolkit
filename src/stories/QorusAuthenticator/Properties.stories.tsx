import { Documentation } from '../components/documentation';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, prepareClassPropertyStory } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/QorusAuthenticator/Parameters',
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
const className = 'QorusAuthenticator';

export const allApiPaths = prepareClassPropertyStory(Template, 'allApiPaths', className);
export const apiPathsAuthenticator = prepareClassPropertyStory(Template, 'apiPathsAuthenticator', className);
export const endpoints = prepareClassPropertyStory(Template, 'endpoints', className);
export const selectedEndpoint = prepareClassPropertyStory(Template, 'selectedEndpoint', className);
