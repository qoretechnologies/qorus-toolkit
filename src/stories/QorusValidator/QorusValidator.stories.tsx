import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from '../components/example';
import { DocumentationItem } from '../components/item';
import { DocumentationWrapper } from '../components/wrapper';
import { QorusAuthenticatorDemo } from '../QorusAuthenticator/demo';
import { DocumentationMeta, DocumentationStory } from '../types';
import { argsData, prepareStory } from '../utils';

export default {
  title: 'API/QorusRequest',
  argTypes: {
    ...argsData,
  },
} as DocumentationMeta;

const Template: DocumentationStory = ({ comments, ...rest }, context) => {
  return (
    <DocumentationWrapper
      title="Qorus Validator"
      description="Helper for authentication"
      code="import { QorusValidator } from '@qoretechnologies/qorus-toolkit'"
    >
      <DocumentationItem {...rest}>{comments.summary}</DocumentationItem>
      <DocumentationExample label={context.story} />
      <ReqoreSpacer height={20} />
      <QorusAuthenticatorDemo />
    </DocumentationWrapper>
  );
};

const className = 'QorusValidator';

export const getTypeFromValue = prepareStory(Template, 'getTypeFromValue', className);