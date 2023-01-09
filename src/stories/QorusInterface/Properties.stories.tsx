import { Documentation } from '../components/documentation';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, getClassData, newClassPropertyStory } from '../utils';

export default {
  title: 'API/QorusInterface/Properties',
  id: 'QorusInterface.properties',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

const Template: IDocumentationStory = ({ comments, ...rest }, context) => {
  const {
    name,
    comments: { summary },
  } = getClassData('QorusInterface');

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
const prepareStory = newClassPropertyStory(Template, 'QorusInterface');

export const browsePath = prepareStory('browsePath');
browsePath.storyName = 'browsePath';
