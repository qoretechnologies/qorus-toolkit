import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareTypeStory } from '../utils';

export default {
  title: 'Typings/TypeAliases',
  id: 'types',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
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

export const Version = prepareTypeStory(Template, 'Version');
Version.storyName = 'Version';

export const Context = prepareTypeStory(Template, 'Context');
Context.storyName = 'Context';

export const QorusEndpointId = prepareTypeStory(Template, 'QorusEndpointId');
QorusEndpointId.storyName = 'QorusEndpointId';

export const QorusEndpointURL = prepareTypeStory(Template, 'QorusEndpointURL');
QorusEndpointURL.storyName = 'QorusEndpointURL';

export const Token = prepareTypeStory(Template, 'Token');
Token.storyName = 'Token';

export const ConstructorOptions = prepareTypeStory(Template, 'ConstructorOptions');
ConstructorOptions.storyName = 'ConstructorOptions';

export const ProviderData = prepareTypeStory(Template, 'ProviderData');
ProviderData.storyName = 'ProviderData';

export const ResponseData = prepareTypeStory(Template, 'ResponseData');
ResponseData.storyName = 'ResponseData';

export const ResponseError = prepareTypeStory(Template, 'ResponseError');
ResponseError.storyName = 'ResponseError';

export const ProviderChildren = prepareTypeStory(Template, 'ProviderChildren');
ProviderChildren.storyName = 'ProviderChildren';
