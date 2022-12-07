import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareStory } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/Authenticator',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ content, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Authenticator"
      description="Helper for authentication"
      code="import { QorusAuthenticator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{content}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const addEndpoint = prepareStory(Template, 'addEndpoint');

// export const login = Template.bind({});
// login.storyName = 'login';
// login.args = {
//   label: 'login( id )',
//   params: { id: { label: 'string' } },
//   returns: [{ label: 'Token', link: 'Token' }, { label: 'undefined' }],
//   content: (
//     <>
//       Takes optional username and password parameters to authenticate the user.
//       <br /> Returns authentication token if successful, throws an error otherwise
//     </>
//   ),
// };

// export const getSelectedEndpoint = Template.bind({});
// getSelectedEndpoint.storyName = 'getSelectedEndpoint';
// getSelectedEndpoint.args = {
//   label: 'getSelectedEndpoint(  )',
//   params: {},
//   returns: [{ label: 'Endpoint', link: 'Endpoint' }, { label: 'undefined' }],
//   content: <>A getter to return selected.</>,
// };

// export const selectEndpoint = Template.bind({});
// selectEndpoint.storyName = 'selectEndpoint';
// selectEndpoint.args = {
//   label: 'selectEndpoint( id )',
//   params: { id: { label: 'string' } },
//   returns: [{ label: 'Endpoint', link: 'Endpoint' }, { label: 'undefined' }],
//   content: (
//     <>
//       Allows the user to select a endpoint from the endpoints array, logout the user from the current selected endpoint.
//       <br />
//       Return the endpoint if exists, undefined otherwise
//     </>
//   ),
// };

// export const logout = Template.bind({});
// logout.storyName = 'logout';
// logout.args = {
//   label: 'logout( id )',
//   params: {},
//   returns: [],
//   content: <> Logs out the current user from the selected endpoint</>,
// };

// export const getAllEndpoints = Template.bind({});
// getAllEndpoints.storyName = 'getAllEndpoints';
// getAllEndpoints.args = {
//   label: 'getAllEndpoints()',
//   returns: [{ label: 'Endpoint[]', link: 'Endpoint' }],
//   content: <>A getter to get all the available</>,
// };

// export const getApiPaths = Template.bind({});
// getApiPaths.storyName = 'getApiPaths';
// getApiPaths.args = {
//   label: 'getApiPaths()',
//   returns: [{ label: 'ApiPaths', link: 'ApiPaths' }],
//   content: <>A getter to return the api paths for the selected </>,
// };

// export const setEndpointUrl = Template.bind({});
// setEndpointUrl.storyName = 'setEndpointUrl';
// setEndpointUrl.args = {
//   label: 'setEndpointUrl()',
//   params: { url: { label: 'string' }, id: { label: 'string' } },
//   returns: [{ label: 'ApiPaths', link: 'ApiPaths' }],
//   content: (
//     <>
//       A setter to set the url of the selected. If the optional id parameter is provided it will use it to find the the
//       endpoint.
//     </>
//   ),
// };

// export const setEndpointVersion = Template.bind({});
// setEndpointVersion.storyName = 'setEndpointVersion';
// setEndpointVersion.args = {
//   label: 'setEndpointVersion()',
//   params: { version: { label: 'Version', link: 'Version' }, id: { label: 'string' } },
//   returns: [{ label: 'ApiPaths', link: 'ApiPaths' }],
//   content: (
//     <>
//       A setter to set the version of the selected endpoint. If the optional id parameter is provided it tries to find
//       the endpoint using the id.{' '}
//     </>
//   ),
// };

// export const getEndpointVersion = Template.bind({});
// getEndpointVersion.storyName = 'getEndpointVersion';
// getEndpointVersion.args = {
//   label: 'getEndpointVersion()',
//   returns: [{ label: 'version', link: 'Version' }],
//   content: <>A getter to get the version of the selected Endpoint.</>,
// };

// export const getAuthToken = Template.bind({});
// getAuthToken.storyName = 'getAuthToken';
// getAuthToken.args = {
//   label: 'getAuthToken()',
//   returns: [{ label: 'string' }, { label: 'undefined' }],
//   content: <>A getter to get the authentication token stored for the selected endpoint.</>,
// };

// export const renewSelectedEndpointToken = Template.bind({});
// renewSelectedEndpointToken.storyName = 'renewSelectedEndpointToken';
// renewSelectedEndpointToken.args = {
//   label: 'renewSelectedEndpointToken()',
//   params: { loginParams: { label: 'LoginParams', link: 'LoginParams' } },
//   returns: [{ label: 'string' }, { label: 'undefined' }],
//   content: <>Allows the user to renew the selected endpoint authentication token.</>,
// };

// export const validateLocalUserToken = Template.bind({});
// validateLocalUserToken.storyName = 'validateLocalUserToken';
// validateLocalUserToken.args = {
//   label: 'validateLocalUserToken()',
//   params: { endpointId: { label: 'string' } },
//   returns: [{ label: 'string' }, { label: 'undefined' }],
//   content: <>Checks if the local stored authentication token is still valid.</>,
// };

// export const validateEndpointData = Template.bind({});
// validateEndpointData.storyName = 'validateEndpointData';
// validateEndpointData.args = {
//   label: 'validateEndpointData()',
//   params: { data: { label: 'AddEndpoint & LoginParams', link: 'LoginParams' }, withCredentials: { label: 'boolean' } },
//   returns: [{ label: 'string' }, { label: 'undefined' }],
//   content: (
//     <>Checks the validity of the selected endpoint, if the endpoint data ar valid returns true, false otherwise.</>
//   ),
// };

// export const getEndpointById = Template.bind({});
// getEndpointById.storyName = 'getEndpointById';
// getEndpointById.args = {
//   label: 'getEndpointById()',
//   params: { id: { label: 'string' } },
//   returns: [{ label: 'endpoint', link: 'Endpoint' }, { label: 'undefined' }],
//   content: <>A getter to return the endpoint if it exist in the endpoints array.</>,
// };
