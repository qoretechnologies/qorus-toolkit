import { Documentation } from '../components/documentation';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusOptions/Methods',
  id: 'QorusOptions.methods',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

const Template: IDocumentationStory = ({ comments, ...rest }, context) => {
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
get.storyName = 'get';

export const set = prepareStory('set');
set.storyName = 'set';

export const validate = prepareStory('validate');
validate.storyName = 'validate';

export const validateRequired = prepareStory('validateRequired');
validateRequired.storyName = 'validateRequired';

export const getAll = prepareStory('getAll');
getAll.storyName = 'getAll';

export const getJsType = prepareStory('getJsType');
getJsType.storyName = 'getJsType';

export const getType = prepareStory('getType');
getType.storyName = 'getType';
