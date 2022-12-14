import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareInterfaceStory } from '../utils';

export default {
  title: 'API/Interfaces',
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
export const AddEndpoint = prepareInterfaceStory(Template, 'AddEndpoint');
export const Endpoint = prepareInterfaceStory(Template, 'Endpoint');
export const LoginParams = prepareInterfaceStory(Template, 'LoginParams');
export const WithQorusAuthToken = prepareInterfaceStory(Template, 'WithQorusAuthToken');
export const WithQorusEndpointId = prepareInterfaceStory(Template, 'WithQorusEndpointId');
export const WithQorusURL = prepareInterfaceStory(Template, 'WithQorusURL');
export const QorusRequestParams = prepareInterfaceStory(Template, 'QorusRequestParams');
export const ConstructorOption = prepareInterfaceStory(Template, 'ConstructorOption');
