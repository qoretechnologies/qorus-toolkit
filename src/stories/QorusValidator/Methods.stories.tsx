import { Documentation } from '../components/documentation';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusValidator/Methods',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  const {
    name,
    comments: { summary },
  } = getClassData('QorusValidator');

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

const prepareStory = newMethodStory(Template, 'QorusValidator');

export const getTypeFromValue = prepareStory('getTypeFromValue');
getTypeFromValue.storyName = 'getTypeFromValue';
