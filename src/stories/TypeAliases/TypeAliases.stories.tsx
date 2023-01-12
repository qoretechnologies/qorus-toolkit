import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, prepareTypeStory } from '../utils';

export default {
  title: 'Typings/TypeAliases',
  id: 'types',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

const Template: IDocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Qorus Type Aliases"
      description="Custom Type Aliases for QorusToolkit"
      // code="import { QorusValidator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const TVersion = prepareTypeStory(Template, 'TVersion');
TVersion.storyName = 'TVersion';

export const TContext = prepareTypeStory(Template, 'TContext');
TContext.storyName = 'TContext';

export const TQorusEndpointId = prepareTypeStory(Template, 'TQorusEndpointId');
TQorusEndpointId.storyName = 'TQorusEndpointId';

export const TQorusEndpointURL = prepareTypeStory(Template, 'TQorusEndpointURL');
TQorusEndpointURL.storyName = 'TQorusEndpointURL';

export const TToken = prepareTypeStory(Template, 'TToken');
TToken.storyName = 'TToken';

export const TQorusOptions = prepareTypeStory(Template, 'TQorusOptions');
TQorusOptions.storyName = 'TQorusOptions';

export const TObjectWithStringKey = prepareTypeStory(Template, 'TObjectWithStringKey');
TObjectWithStringKey.storyName = 'TObjectWithStringKey';

export const TObjectWithAnyValue = prepareTypeStory(Template, 'TObjectWithAnyValue');
TObjectWithAnyValue.storyName = 'TObjectWithAnyValue';
