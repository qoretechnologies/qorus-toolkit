import { ReqoreColumn, ReqoreColumns, ReqoreH1, ReqoreIcon, ReqorePanel, ReqoreSpacer } from '@qoretechnologies/reqore';
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
      <ReqoreColumn flexFlow="column">
        <ReqoreH1>{title}</ReqoreH1>
        <ReqoreSpacer height={30} />
        <SyntaxHighlighter language="typescript" style={atomDark}>
          {code}
        </SyntaxHighlighter>
        <ReqoreSpacer height={20} />
        <ReqorePanel contentSize="big" minimal customTheme={{ main: '#143a40' }}>
          <ReqoreIcon icon="InformationLine" size="20px" /> {description}
        </ReqorePanel>
        <ReqoreSpacer height={30} />
        {children}
      </ReqoreColumn>
    </ReqoreColumns>
  );
};
