import { Documentation } from '../components/documentation';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newClassPropertyStory } from '../utils';

export default {
  title: 'API/QorusDataProvider/Properties',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  const {
    name,
    comments: { summary },
  } = getClassData('QorusAuthenticator');

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
const prepareStory = newClassPropertyStory(Template, 'QorusDataProvider');

export const path = prepareStory('path');
path.storyName = 'path';

export const responseData = prepareStory('responseData');
responseData.storyName = 'responseData';

export const context = prepareStory('context');
context.storyName = 'context';

export const providerData = prepareStory('providerData');
providerData.storyName = 'providerData';

export const responseError = prepareStory('responseError');
responseError.storyName = 'responseError';