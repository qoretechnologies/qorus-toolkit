import { Documentation } from '../components/documentation';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusInterface/Methods',
  id: 'QorusInterface.methods',
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

const prepareStory = newMethodStory(Template, 'QorusInterface');

export const enable = prepareStory('enable');
enable.storyName = 'enable';

export const disable = prepareStory('disable');
disable.storyName = 'disable';

export const kill = prepareStory('kill');
kill.storyName = 'kill';
