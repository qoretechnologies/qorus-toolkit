import { Documentation } from '../components/documentation';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData } from '../utils';

export default {
  title: 'API/QorusAuthenticator',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

export const Overview: DocumentationStory = ({ comments }, context) => {
  const {
    name,
    comments: { summary },
  } = getClassData('QorusAuthenticator');

  return (
    <Documentation name={name} description={summary || undefined} summary={comments?.summary} story={context.story} />
  );
};
