import { DocumentationOverview } from '../components/overview';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData } from '../utils';

export default {
  title: 'API/QorusValidator',
  id: 'QorusValidator',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

export const Overview: IDocumentationStory = () => {
  return <DocumentationOverview name="QorusValidator" />;
};
