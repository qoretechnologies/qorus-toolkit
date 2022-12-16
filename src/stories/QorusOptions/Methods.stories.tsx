import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { Documentation } from '../components/documentation';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusOptions/Methods',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  const {
    name,
    comments: { summary },
  } = getClassData('QorusOptions');

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

const prepareStory = newMethodStory(Template, 'QorusOptions');

export const get = prepareStory('get');
export const set = prepareStory('set');
export const validate = prepareStory('validate');
export const validateProperty = prepareStory('validateProperty');
export const getAll = prepareStory('getAll');
export const getJsType = prepareStory('getJsType');
export const getType = prepareStory('getType');
