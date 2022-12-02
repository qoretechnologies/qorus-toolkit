import { ReqoreColumn, ReqoreColumns, ReqoreH1, ReqoreMessage, ReqoreSpacer } from '@qoretechnologies/reqore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface IDocumentationProps {
  title: string;
  description: string;
  children?: any;
  code?: string;
}

export const DocumentationWrapper = ({ title, description, code, children }: IDocumentationProps) => {
  return (
    <ReqoreColumns style={{ maxWidth: '800px', margin: '0 auto' }}>
      <ReqoreColumn flexFlow="column" alignItems="stretch">
        <ReqoreH1>{title}</ReqoreH1>
        <ReqoreSpacer height={10} />
        <SyntaxHighlighter language="typescript" style={atomDark}>
          {code}
        </SyntaxHighlighter>
        <ReqoreSpacer height={20} />
        <ReqoreMessage size="normal" customTheme={{ main: '#143240' }} icon="InformationLine" flat>
          {description}
        </ReqoreMessage>
        <ReqoreSpacer height={30} />
        {children}
      </ReqoreColumn>
    </ReqoreColumns>
  );
};
