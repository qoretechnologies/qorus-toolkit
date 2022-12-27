import {
  ReqoreButton,
  ReqoreColumn,
  ReqoreColumns,
  ReqoreControlGroup,
  ReqoreH1,
  ReqoreH2,
  ReqoreMessage,
  ReqoreSpacer,
} from '@qoretechnologies/reqore';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian as style } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import useDocumentationTypeLabel from '../hooks/useDocumentationTypeLabel';
import { getClassData, toCapitalCase } from '../utils';
import { asyncEffect } from './item';

export interface IDocumentationOverviewProps {
  name: string;
  code?: string;
}

export const DocumentationOverview = ({ name, code }: IDocumentationOverviewProps) => {
  const {
    comments: { summary },
    properties,
    methods,
  } = getClassData(name);
  return (
    <ReqoreColumns style={{ maxWidth: '800px', margin: '0 auto' }}>
      <ReqoreColumn flexFlow="column" alignItems="stretch">
        <ReqoreH1>{name}</ReqoreH1>
        <ReqoreSpacer height={20} />
        <SyntaxHighlighter language="typescript" style={style}>
          {code || `import { ${name} } from '@qoretechnologies/qorus-toolkit'`}
        </SyntaxHighlighter>
        <ReqoreSpacer height={20} />
        <ReqoreMessage size="normal" inverted effect={{ color: '#ffffff' }} intent="info" icon="InformationLine">
          {summary}
        </ReqoreMessage>
        <ReqoreSpacer height={40} />
        <ReqoreColumns columnsGap="25px">
          <ReqoreColumn flexFlow="column">
            <ReqoreH2>Properties</ReqoreH2>
            <ReqoreSpacer height={20} />
            <ReqoreControlGroup vertical fluid>
              {properties.map((prop) => (
                <ReqoreButton
                  wrap
                  description={prop.comments?.summary || '-'}
                  icon="CodeBoxLine"
                  rightIcon="ExternalLinkLine"
                  badge={{
                    label: useDocumentationTypeLabel(prop.type)?.type,
                  }}
                  onClick={linkTo(`${name}.properties`, toCapitalCase(prop.name))}
                >
                  {prop.name}
                </ReqoreButton>
              ))}
            </ReqoreControlGroup>
          </ReqoreColumn>
          <ReqoreColumn flexFlow="column">
            <ReqoreH2>Methods</ReqoreH2>
            <ReqoreSpacer height={20} />
            <ReqoreControlGroup vertical fluid>
              {methods?.map((prop) => (
                <ReqoreButton
                  wrap
                  description={prop.comments?.summary || '-'}
                  icon="CodeBoxFill"
                  rightIcon="ExternalLinkLine"
                  badge={
                    {
                      label: prop.async
                        ? `Promise<${useDocumentationTypeLabel(prop.returnTypes)?.type}>`
                        : useDocumentationTypeLabel(prop.returnTypes)?.type,
                      effect: prop.async ? asyncEffect : undefined,
                    } as IReqoreTagProps
                  }
                  onClick={linkTo(`${name}.methods`, toCapitalCase(prop.name))}
                >
                  {prop.name}
                </ReqoreButton>
              ))}
            </ReqoreControlGroup>
          </ReqoreColumn>
        </ReqoreColumns>
      </ReqoreColumn>
    </ReqoreColumns>
  );
};
