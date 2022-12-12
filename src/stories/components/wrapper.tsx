import {
  ReqoreColumn,
  ReqoreColumns,
  ReqoreH1,
  ReqoreMessage,
  ReqorePanel,
  ReqoreSpacer,
} from '@qoretechnologies/reqore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface IDocumentationProps {
  title: string;
  description?: string;
  children?: any;
  code?: string;
}

export const DocumentationWrapper = ({ title, description, code, children }: IDocumentationProps) => {
  return (
    <ReqoreColumns style={{ maxWidth: '800px', margin: '0 auto' }}>
      <ReqoreColumn flexFlow="column" alignItems="stretch">
        {children}
        <ReqoreSpacer height={20} />
        <ReqorePanel label="Class Info" collapsible isCollapsed flat>
          <ReqoreH1>{title}</ReqoreH1>
          <ReqoreSpacer height={20} />
          <SyntaxHighlighter language="typescript" style={atomDark}>
            {code}
          </SyntaxHighlighter>
          <ReqoreSpacer height={20} />
          <ReqoreMessage size="normal" intent="info" icon="InformationLine" flat>
            {description}
          </ReqoreMessage>
        </ReqorePanel>
      </ReqoreColumn>
    </ReqoreColumns>
  );
};
