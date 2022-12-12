import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareStory } from '../utils';

export default {
  title: 'API/QorusOptions',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Qorus Options"
      description="Constructor options manager for QorusDataProvider"
      code="import { QorusOptions } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

const className = 'QorusOptions';

export const get = prepareStory(Template, 'get', className);
export const set = prepareStory(Template, 'set', className);
export const validate = prepareStory(Template, 'validate', className);
export const validateProperty = prepareStory(Template, 'validateProperty', className);
export const getAll = prepareStory(Template, 'getAll', className);
export const parseChildren = prepareStory(Template, 'parseChildren', className);
export const convertToJsType = prepareStory(Template, 'convertToJsType', className);
