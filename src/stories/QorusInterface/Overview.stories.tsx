import { DocumentationOverview } from '../components/overview';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusInterface',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

export const Overview: IDocumentationStory = () => {
  return <DocumentationOverview name="QorusInterface" />;
};
