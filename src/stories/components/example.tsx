import { ReqorePanel } from '@qoretechnologies/reqore';
import ReactRunkit from 'react-runkit';
import codeExamples from '../../../codeExamples.json';
import { version } from '../../../pullRequestRelease.json';

export interface IDocumentationExampleProps {
  label?: string;
  name?: string;
}

export const DocumentationExample = ({ name, label }: IDocumentationExampleProps) => {
  const fullLabel = `${name}.${label}`;

  if (!codeExamples[fullLabel]) {
    return null;
  }

  return (
    <ReqorePanel label="Example" flat headerSize={3} collapsible isCollapsed contentStyle={{ padding: '25px' }}>
      <ReactRunkit
        source={codeExamples[fullLabel]}
        nodeVersion="16"
        preamble={`const Qorus = require('@qoretechnologies/qorus-toolkit@${version}')`}
      />
    </ReqorePanel>
  );
};
