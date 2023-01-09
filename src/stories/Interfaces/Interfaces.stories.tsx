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

export const IDataProviderChildrenConstructorPropertyOptions = prepareInterfaceStory(
  Template,
  'IDataProviderChildrenConstructorPropertyOptions',
);
IDataProviderChildrenConstructorPropertyOptions.storyName = 'IDataProviderChildrenConstructorPropertyOptions';

export const IQorusDataProviderConstructorOptions = prepareInterfaceStory(
  Template,
  'IQorusDataProviderConstructorOptions',
);
IQorusDataProviderConstructorOptions.storyName = 'IQorusDataProviderConstructorOptions';

export const IDataProviderResponseData = prepareInterfaceStory(Template, 'IDataProviderResponseData');
IDataProviderResponseData.storyName = 'IDataProviderResponseData';

export const IDataProviderChildren = prepareInterfaceStory(Template, 'IDataProviderChildren');
IDataProviderChildren.storyName = 'IDataProviderChildren';

export const IAddEndpoint = prepareInterfaceStory(Template, 'IAddEndpoint');
IAddEndpoint.storyName = 'IAddEndpoint';

export const IEndpoint = prepareInterfaceStory(Template, 'IEndpoint');
IEndpoint.storyName = 'IEndpoint';

export const ILoginParams = prepareInterfaceStory(Template, 'ILoginParams');
ILoginParams.storyName = 'ILoginParams';

export const IWithQorusAuthToken = prepareInterfaceStory(Template, 'IWithQorusAuthToken');
IWithQorusAuthToken.storyName = 'IWithQorusAuthToken';

export const IWithQorusEndpointId = prepareInterfaceStory(Template, 'IWithQorusEndpointId');
IWithQorusEndpointId.storyName = 'IWithQorusEndpointId';

export const IWithQorusURL = prepareInterfaceStory(Template, 'IWithQorusURL');
IWithQorusURL.storyName = 'IWithQorusURL';

export const IQorusRequestParams = prepareInterfaceStory(Template, 'IQorusRequestParams');
IQorusRequestParams.storyName = 'IQorusRequestParams';

export const IApiPaths = prepareInterfaceStory(Template, 'IApiPaths');
IApiPaths.storyName = 'IApiPaths';

export const IApiPathsAuthenticator = prepareInterfaceStory(Template, 'IApiPathsAuthenticator');
IApiPathsAuthenticator.storyName = 'IApiPathsAuthenticator';

export const IApiPathsDataProvider = prepareInterfaceStory(Template, 'IApiPathsDataProvider');
IApiPathsDataProvider.storyName = 'IApiPathsDataProvider';

export const IApiPathsJobs = prepareInterfaceStory(Template, 'IApiPathsJobs');
IApiPathsJobs.storyName = 'IApiPathsJobs';

export const IDefaultHeaders = prepareInterfaceStory(Template, 'IDefaultHeaders');
IDefaultHeaders.storyName = 'IDefaultHeaders';
