import { ReqoreColumn, ReqoreColumns, ReqorePanel, ReqoreSpacer } from '@qoretechnologies/reqore';
import { DocumentationOverview } from './overview';

export interface IDocumentationProps {
  title: string;
  description?: string;
  children?: any;
  code?: string;
}

export const DocumentationWrapper = ({ title, children }: IDocumentationProps) => {
  return (
    <ReqoreColumns style={{ maxWidth: '800px', margin: '0 auto' }}>
      <ReqoreColumn flexFlow="column" alignItems="stretch">
        {children}
        <ReqoreSpacer height={20} />
        <ReqorePanel label="Class Info" collapsible isCollapsed flat>
          <DocumentationOverview name={title} />
        </ReqorePanel>
      </ReqoreColumn>
    </ReqoreColumns>
  );
};
