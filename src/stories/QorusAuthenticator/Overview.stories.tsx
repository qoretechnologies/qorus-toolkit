import { DocumentationOverview } from '../components/overview';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusAuthenticator',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

export const Overview: DocumentationStory = () => {
  return <DocumentationOverview name="QorusAuthenticator" />;
};
