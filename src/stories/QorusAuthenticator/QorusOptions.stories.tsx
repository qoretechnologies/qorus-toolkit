import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData } from '../utils';
import { QorusAuthenticatorDemo } from './demo';

export default {
  title: 'API/Options',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ content, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Options"
      description="Provider options handler"
      code="import { QorusOptions } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{content}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

export const getAll = Template.bind({});
getAll.storyName = 'getAll';
getAll.args = {
  label: 'getAll( qorusRequestParams, endpoint )',
  params: {
    qorusRequestParams: { label: 'QorusRequestParams', link: 'QorusRequestParams' },
    endpoint: { label: 'Endpoint' },
  },
  returns: [{ label: 'Properties : { [ x : string ]: { } } ' }],
  content: <>Get list of properties required for the provider.</>,
};

export const getType = Template.bind({});
getType.storyName = 'getType';
getType.args = {
  label: 'getType( propertyName )',
  params: {
    propertyName: { label: 'string' },
  },
  returns: [{ label: '[ TypeString ] : string [ ]' }],
  content: (
    <>
      A getter to get property type.
      <br /> Returns array of property types acceptable by the property
    </>
  ),
};

export const getJsType = Template.bind({});
getJsType.storyName = 'getJsType';
getJsType.args = {
  label: 'getJsType( propertyName )',
  params: {
    propertyName: { label: 'string' },
  },
  returns: [{ label: '[ TypeString ] : string [ ]' }],
  content: (
    <>
      A getter to get js types for a property.
      <br /> Returns array of js types accepted by the property
    </>
  ),
};

export const get = Template.bind({});
get.storyName = 'get';
get.args = {
  label: 'get( propertyName )',
  params: {
    propertyName: { label: 'string' },
  },
  returns: [{ label: '[ TypeString ] : string [ ]' }],
  content: (
    <>
      A getter to get property object.
      <br /> Returns property object
    </>
  ),
};

export const set = Template.bind({});
set.storyName = 'set';
set.args = {
  label: 'set( propertyName )',
  params: {
    propertyName: { label: 'string' },
  },
  returns: [{ label: '[ TypeString ] : string [ ]' }],
  content: (
    <>
      A setter to set property value
      <br /> Returns the property object
    </>
  ),
};

export const validateProperty = Template.bind({});
validateProperty.storyName = 'validateProperty';
validateProperty.args = {
  label: 'validateProperty( propertyName )',
  params: {
    propertyName: { label: 'string' },
  },
  returns: [{ label: '[ TypeString ] : string [ ]' }],
  content: (
    <>
      A method to validate if the provided value can be used by the property
      <br /> Returns true if value can be used false otherwise
    </>
  ),
};
