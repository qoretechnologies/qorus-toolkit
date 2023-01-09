import { ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationExample } from './example';
import { DocumentationItem } from './item';
import { DocumentationTip } from './tip';
import { DocumentationWrapper } from './wrapper';

export interface IDocumentationProps {
  name: string;
  description?: string;
  summary?: string | null;
  returnSummary?: string | null;
  story?: string;
  children?: any;
  itemName?: string;
  tip?: string;
}

export const Documentation = ({
  name,
  description,
  summary,
  story,
  children,
  itemName,
  tip,
  ...rest
}: IDocumentationProps) => {
  return (
    <DocumentationWrapper
      title={name}
      description={description || undefined}
      code={`import { ${name} } from '@qoretechnologies/qorus-toolkit'`}
    >
      <DocumentationItem {...rest} name={itemName} parent={name}>
        {summary}
      </DocumentationItem>
      {tip && <DocumentationTip>{tip}</DocumentationTip>}
      <ReqoreSpacer height={20} />
      <DocumentationExample label={story} name={name} />
      <ReqoreSpacer height={20} />
      {children}
    </DocumentationWrapper>
  );
};
