import { ReqoreColumn, ReqoreColumns, ReqorePanel, ReqoreSpacer } from '@qoretechnologies/reqore';
import { useMemo } from 'react';
import { doesClassExist } from '../utils';
import { DocumentationOverview } from './overview';

export interface IDocumentationProps {
  title: string;
  description?: string;
  children?: any;
  code?: string;
}

export const DocumentationWrapper = ({ title, children }: IDocumentationProps) => {
  const hasClass = useMemo(() => doesClassExist(title), [title]);

  return (
    <ReqoreColumns style={{ maxWidth: '800px', margin: '0 auto' }}>
      <ReqoreColumn flexFlow="column" alignItems="stretch">
        {children}
        {hasClass ? (
          <>
            <ReqoreSpacer height={20} />
            <ReqorePanel label="Class Info" collapsible isCollapsed flat>
              <DocumentationOverview name={title} />
            </ReqorePanel>
          </>
        ) : null}
      </ReqoreColumn>
    </ReqoreColumns>
  );
};
