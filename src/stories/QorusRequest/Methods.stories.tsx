import { Documentation } from '../components/documentation';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, getClassData, newMethodStory } from '../utils';

export default {
  title: 'API/QorusRequest/Methods',
  id: 'QorusRequest.methods',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

const Template: IDocumentationStory = ({ comments, ...rest }, context) => {
  const {
    name,
    comments: { summary },
  } = getClassData('QorusRequest');

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

const prepareStory = newMethodStory(Template, 'QorusRequest');

export const get = prepareStory('get');
get.storyName = 'get';

export const post = prepareStory('post');
post.storyName = 'post';

export const put = prepareStory('put');
put.storyName = 'put';

export const deleteReq = prepareStory('deleteReq');
deleteReq.storyName = 'deleteReq';
