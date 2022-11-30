import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/DataProvider',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ content, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Data Provider"
      description="Manager for Qorus Data Provider api"
      code="import { QorusDataProvider } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{content}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const getRecord = Template.bind({});
getRecord.storyName = 'getRecord';
getRecord.args = {
  label: 'getRecord( )',
  params: {},
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Fetch the initial data provider with context 'record'</>,
};

export const getType = Template.bind({});
getType.storyName = 'getType';
getType.args = {
  label: 'getType( )',
  params: {},
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Fetch the initial data provider with context 'type'</>,
};

export const getApi = Template.bind({});
getApi.storyName = 'getApi';
getApi.args = {
  label: 'getApi( )',
  params: {},
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Fetch the initial data provider with context 'api'</>,
};

export const getEvent = Template.bind({});
getEvent.storyName = 'getEvent';
getEvent.args = {
  label: 'getEvent( )',
  params: {},
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Fetch the initial data provider with context 'event'</>,
};

export const getMessage = Template.bind({});
getMessage.storyName = 'getMessage';
getMessage.args = {
  label: 'getMessage( )',
  params: {},
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Fetch the initial data provider with context 'message'</>,
};

export const has = Template.bind({});
has.storyName = 'has';
has.args = {
  label: 'has( name )',
  params: { name: { label: 'string' } },
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Checks if the children exist on the provider</>,
};

export const getChildrenNames = Template.bind({});
getChildrenNames.storyName = 'getChildrenNames';
getChildrenNames.args = {
  label: 'getChildrenNames( name )',
  params: { name: { label: 'string' } },
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Returns the list of provider names</>,
};

export const get = Template.bind({});
get.storyName = 'get';
get.args = {
  label: 'get( name )',
  params: { name: { label: 'string' } },
  returns: [{ label: 'QorusDataProvider' }],
  content: <>Method to select the next children from the current provider for further operations</>,
};

export const getOptions = Template.bind({});
getOptions.storyName = 'getOptions';
getOptions.args = {
  label: 'getOptions( childrenName )',
  params: { childrenName: { label: 'string' } },
  returns: [{ label: 'QorusDataProvider' }],
  content: <>A getter to get options by name for a children provider</>,
};

export const getAllOptions = Template.bind({});
getAllOptions.storyName = 'getAllOptions';
getAllOptions.args = {
  label: 'getAllOptions( )',
  params: {},
  returns: [{ label: '[QorusOptions]', link: 'QorusOptions[]' }],
  content: <>A getter to get options for all the children data providers.</>,
};

export const hasData = Template.bind({});
hasData.storyName = 'hasData';
hasData.args = {
  label: 'hasData( )',
  params: {},
  returns: [{ label: 'Boolean' }],
  content: <>A Method to verify if the current provider has children.</>,
};

export const getData = Template.bind({});
getData.storyName = 'getData';
getData.args = {
  label: 'getData( )',
  params: {},
  returns: [{ label: '{ProviderData, ResponseData, ErrorData}', link: 'ProviderData' }],
  content: <>A getter to get available data for the current provider.</>,
};

export const getPath = Template.bind({});
getPath.storyName = 'getPath';
getPath.args = {
  label: 'getPath( )',
  params: {},
  returns: [{ label: 'string[]' }],
  content: <>A getter to the the stored path array for the current provider</>,
};

export const getFinalPath = Template.bind({});
getFinalPath.storyName = 'getFinalPath';
getFinalPath.args = {
  label: 'getFinalPath( )',
  params: {},
  returns: [{ label: 'string' }],
  content: <>A getter to get request path string for the current provider</>,
};
