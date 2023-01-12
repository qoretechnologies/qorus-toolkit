import {
  ReqoreButton,
  ReqoreColumn,
  ReqoreColumns,
  ReqoreControlGroup,
  ReqoreH1,
  ReqoreH2,
  ReqoreInput,
  ReqoreMessage,
  ReqoreSpacer,
} from '@qoretechnologies/reqore';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';
import { size } from 'lodash';
import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
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
    properties = [],
    methods = [],
  } = getClassData(name);
  const [methodsQuery, setMethodsQuery] = useState('');
  const [propertiesQuery, setPropertiesQuery] = useState('');

  const filteredMethods = methods.filter((method) => {
    if (!methodsQuery) return true;

    return method.name?.toLowerCase().includes(methodsQuery.toLowerCase());
  });

  const filteredProperties = properties.filter((property) => {
    if (!propertiesQuery) return true;

    return property.name?.toLowerCase().includes(propertiesQuery.toLowerCase());
  });

  return (
    <ReqoreColumns style={{ maxWidth: '800px', margin: '0 auto' }}>
      <ReqoreColumn flexFlow="column" alignItems="stretch">
        <ReqoreH1>{name}</ReqoreH1>
        <ReqoreSpacer height={20} />
        <SyntaxHighlighter language="typescript" style={style}>
          {code || `import { ${name} } from '@qoretechnologies/qorus-toolkit'`}
        </SyntaxHighlighter>
        <ReqoreSpacer height={20} />
        <ReqoreMessage intent="info" icon="InformationLine">
          <ReactMarkdown>{summary ?? ''}</ReactMarkdown>
        </ReqoreMessage>
        <ReqoreSpacer height={40} />
        <ReqoreColumns columnsGap="25px">
          {size(properties) ? (
            <ReqoreColumn flexFlow="column">
              <ReqoreH2>Properties</ReqoreH2>
              <ReqoreSpacer height={20} />
              <ReqoreControlGroup fluid>
                <ReqoreInput
                  value={propertiesQuery}
                  onChange={(e: any) => setPropertiesQuery(e.target.value)}
                  onClearClick={() => setPropertiesQuery('')}
                  placeholder="Filter properties..."
                  icon="FilterLine"
                />
              </ReqoreControlGroup>
              <ReqoreSpacer height={20} />
              <ReqoreControlGroup vertical fluid>
                {filteredProperties.map((prop) => (
                  <ReqoreButton
                    key={prop.name}
                    wrap
                    description={prop.comments?.summary || '-'}
                    icon="CodeBoxLine"
                    rightIcon="ExternalLinkLine"
                    badge={{
                      label: useDocumentationTypeLabel(prop.type)?.type,
                      wrap: true,
                    }}
                    onClick={linkTo(`${name}.properties`, toCapitalCase(prop.name))}
                  >
                    {prop.name}
                  </ReqoreButton>
                ))}
              </ReqoreControlGroup>
            </ReqoreColumn>
          ) : null}
          <ReqoreColumn flexFlow="column">
            <ReqoreH2>Methods</ReqoreH2>
            <ReqoreSpacer height={20} />
            <ReqoreControlGroup fluid>
              <ReqoreInput
                value={methodsQuery}
                onChange={(e: any) => setMethodsQuery(e.target.value)}
                onClearClick={() => setMethodsQuery('')}
                placeholder="Filter methods..."
                icon="FilterLine"
              />
            </ReqoreControlGroup>
            <ReqoreSpacer height={20} />
            <ReqoreControlGroup vertical fluid>
              {filteredMethods?.map((prop) => (
                <ReqoreButton
                  key={prop.name}
                  wrap
                  description={prop.comments?.summary || '-'}
                  icon="CodeBoxFill"
                  rightIcon="ExternalLinkLine"
                  badge={
                    {
                      label: prop.async
                        ? `Promise<${useDocumentationTypeLabel(prop.returnTypes).type}>`
                        : useDocumentationTypeLabel(prop.returnTypes).type,
                      effect: prop.async ? asyncEffect : undefined,
                      wrap: true,
                    } as IReqoreTagProps
                  }
                  onClick={linkTo(`${name}.methods`, toCapitalCase(prop.name as string))}
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
