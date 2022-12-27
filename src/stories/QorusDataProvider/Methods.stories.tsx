import { Documentation } from '../components/documentation';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusDataProvider/Methods',
  id: 'QorusDataProvider.methods',
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
getRecord.storyName = 'getRecord';

export const getType = prepareStory('getType');
getType.storyName = 'getType';

export const has = prepareStory('has');
has.storyName = 'has';

export const hasData = prepareStory('hasData');
hasData.storyName = 'hasData';

export const setPath = prepareStory('setPath');
setPath.storyName = 'setPath';

export const getAllOptions = prepareStory('getAllOptions');
getAllOptions.storyName = 'getAllOptions';

export const getChildren = prepareStory('getChildren');
getChildren.storyName = 'getChildren';

export const getContext = prepareStory('getContext');
getContext.storyName = 'getContext';

export const getEvent = prepareStory('getEvent');
getEvent.storyName = 'getEvent';

export const getMessage = prepareStory('getMessage');
getMessage.storyName = 'getMessage';

export const getPath = prepareStory('getPath');
getPath.storyName = 'getPath';

export const get = prepareStory('get');
get.storyName = 'get';

export const getApi = prepareStory('getApi');
getApi.storyName = 'getApi';

export const getChildrenNames = prepareStory('getChildrenNames');
getChildrenNames.storyName = 'getChildrenNames';

export const getData = prepareStory('getData');
getData.storyName = 'getData';

export const getFinalPath = prepareStory('getFinalPath');
getFinalPath.storyName = 'getFinalPath';

export const getOptions = prepareStory('getOptions');
getOptions.storyName = 'getOptions';
