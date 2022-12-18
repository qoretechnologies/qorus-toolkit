import { ReqorePanel } from '@qoretechnologies/reqore';
import ReactRunkit from 'react-runkit';
import codeExamples from '../../../codeExamples.json';
import { version } from '../../../package.json';

export interface IDocumentationExampleProps {
  label?: string;
}

export const DocumentationExample = ({ label }: IDocumentationExampleProps) => {
  console.log(label);
  if (!label || !codeExamples[label]) {
    return null;
  }

  return (
    <ReqorePanel label="Example" flat headerSize={3} collapsible isCollapsed contentStyle={{ padding: '25px' }}>
      <ReactRunkit
        source={codeExamples[label]}
        nodeVersion="16"
        preamble={`const Qorus = require('@qoretechnologies/qorus-toolkit@${version}')`}
      />
    </ReqorePanel>
  );
};
