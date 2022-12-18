import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareInterfaceStory } from '../utils';

export default {
  title: 'Typings/Interfaces',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Qorus Interfaces"
      description="Validates the DataProvider properties"
      // code="import { QorusValidator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary ?? ''}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const Properties = prepareInterfaceStory(Template, 'Properties');
Properties.storyName = 'Properties';

export const AddEndpoint = prepareInterfaceStory(Template, 'AddEndpoint');
AddEndpoint.storyName = 'AddEndpoint';

export const Endpoint = prepareInterfaceStory(Template, 'Endpoint');
Endpoint.storyName = 'Endpoint';

export const LoginParams = prepareInterfaceStory(Template, 'LoginParams');
LoginParams.storyName = 'LoginParams';

export const WithQorusAuthToken = prepareInterfaceStory(Template, 'WithQorusAuthToken');
WithQorusAuthToken.storyName = 'WithQorusAuthToken';

export const WithQorusEndpointId = prepareInterfaceStory(Template, 'WithQorusEndpointId');
WithQorusEndpointId.storyName = 'WithQorusEndpointId';

export const WithQorusURL = prepareInterfaceStory(Template, 'WithQorusURL');
WithQorusURL.storyName = 'WithQorusURL';

export const QorusRequestParams = prepareInterfaceStory(Template, 'QorusRequestParams');
QorusRequestParams.storyName = 'QorusRequestParams';

export const ProviderOption = prepareInterfaceStory(Template, 'ProviderOption');
ProviderOption.storyName = 'ProviderOption';
