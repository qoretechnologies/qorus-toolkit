import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { IDocumentationMeta, IDocumentationStory } from '../types';
import { argsData, prepareInterfaceStory } from '../utils';

export default {
  title: 'Typings/Interfaces',
  id: 'interfaces',
  argTypes: {
    ...argsData,
  },
} as IDocumentationMeta;

const Template: IDocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper title="Qorus Interfaces" description="Validates the DataProvider properties">
      <DocumentationItem {...rest}>{comments.summary ?? ''}</DocumentationItem>
      <DocumentationExample label={context.storyName} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const DataProviderChildrenConstructorPropertyOptions = prepareInterfaceStory(
  Template,
  'DataProviderChildrenConstructorPropertyOptions',
);
DataProviderChildrenConstructorPropertyOptions.storyName = 'DataProviderChildrenConstructorPropertyOptions';

export const QorusDataProviderConstructorOptions = prepareInterfaceStory(
  Template,
  'QorusDataProviderConstructorOptions',
);
QorusDataProviderConstructorOptions.storyName = 'QorusDataProviderConstructorOptions';

export const DataProviderResponseData = prepareInterfaceStory(Template, 'DataProviderResponseData');
DataProviderResponseData.storyName = 'DataProviderResponseData';

export const DataProviderChildren = prepareInterfaceStory(Template, 'DataProviderChildren');
DataProviderChildren.storyName = 'DataProviderChildren';

export const AddEndpoint = prepareInterfaceStory(Template, 'AddEndpoint');
AddEndpoint.storyName = 'AddEndpoint';

export const Endpoint = prepareInterfaceStory(Template, 'Endpoint');
//Endpoint.storyName = 'Endpoint';

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

export const ApiPaths = prepareInterfaceStory(Template, 'ApiPaths');
ApiPaths.storyName = 'ApiPaths';

export const ApiPathsAuthenticator = prepareInterfaceStory(Template, 'ApiPathsAuthenticator');
ApiPathsAuthenticator.storyName = 'ApiPathsAuthenticator';

export const ApiPathsDataProvider = prepareInterfaceStory(Template, 'ApiPathsDataProvider');
ApiPathsDataProvider.storyName = 'ApiPathsDataProvider';
