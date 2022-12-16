import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { Documentation } from '../components/documentation';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusDataProvider/Methods',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  const {
    name,
    comments: { summary },
  } = getClassData('QorusDataProvider');

  return (
    <Documentation
      {...rest}
      itemName={rest.name}
      name={name}
      description={summary || undefined}
      summary={comments.summary}
      returnSummary={comments.returnSummary}
      story={context.story}
    >
      <QorusAuthenticatorDemo />
    </Documentation>
  );
};

const prepareStory = newMethodStory(Template, 'QorusDataProvider');

export const getRecord = prepareStory('getRecord');
export const getType = prepareStory('getType');
export const has = prepareStory('has');
export const hasData = prepareStory('hasData');
export const setData = prepareStory('setData');
export const setPath = prepareStory('setPath');
export const getAllOptions = prepareStory('getAllOptions');
export const getChildren = prepareStory('getChildren');
export const getContext = prepareStory('getContext');
export const getEvent = prepareStory('getEvent');
export const getMessage = prepareStory('getMessage');
export const getPath = prepareStory('getPath');
export const get = prepareStory('get');
export const getApi = prepareStory('getApi');
export const getChildrenNames = prepareStory('getChildrenNames');
export const getData = prepareStory('getData');
export const getFinalPath = prepareStory('getFinalPath');
export const getOptions = prepareStory('getOptions');
