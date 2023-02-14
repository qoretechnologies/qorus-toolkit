import {
  ReqoreButton,
  ReqoreColumn,
  ReqoreColumns,
  ReqoreControlGroup,
  ReqoreH1,
  ReqoreH3,
  ReqoreHorizontalSpacer,
  ReqoreInput,
  ReqoreMessage,
  ReqorePanel,
  ReqoreSpacer,
  ReqoreVerticalSpacer,
} from '@qoretechnologies/reqore';
import ReqoreTag, { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';
import { size } from 'lodash';
import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian as style } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import useDocumentationTypeLabel from '../hooks/useDocumentationTypeLabel';
import { getClassData, toCapitalCase } from '../utils';
import { asyncEffect } from './item';
import { DocumentationHashType } from './type';

export interface IDocumentationOverviewProps {
  name: string;
  code?: string;
}

export const DocumentationOverview = ({ name, code }: IDocumentationOverviewProps) => {
  const {
    comments: { summary },
    properties = [],
    methods = [],
    constructor,
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
        <ReqoreVerticalSpacer height={20} />
        <ReqorePanel minimal transparent flat headerSize={3} label="Constructor">
          <ReqoreMessage
            icon="CodeLine"
            effect={{
              gradient: {
                direction: 'to right bottom',
                colors: {
                  100: '#2e2e2e',
                  0: '#000000',
                },
              },
              color: '#ffffff',
              spaced: 1,
              textSize: 'normal',
            }}
          >
            <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces', margin: 0 }}>
              new {name}(
              {size(constructor?.parameters) ? (
                <ReqoreControlGroup fixed size="small" vertical>
                  <ReqoreVerticalSpacer height={5} />
                  {constructor?.parameters?.map((param) => (
                    <ReqoreControlGroup key={param.name} fixed stack>
                      <ReqoreHorizontalSpacer width={10} />
                      <ReqoreTag minimal label={param.name} labelEffect={{ spaced: 2, weight: 'light' }} />
                      <DocumentationHashType type={param.type} key={param.name} />
                    </ReqoreControlGroup>
                  ))}
                  <ReqoreVerticalSpacer height={5} />
                </ReqoreControlGroup>
              ) : null}
              )
            </pre>
          </ReqoreMessage>
        </ReqorePanel>
        <ReqoreSpacer height={40} />
        <ReqoreColumns columnsGap="25px">
          {size(properties) ? (
            <ReqoreColumn flexFlow="column">
              <ReqoreH3>Properties</ReqoreH3>
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
                    badge={(Array.isArray(prop.type) ? prop.type : [prop.type]).map((type) => ({
                      label: useDocumentationTypeLabel(type.fullType).type,
                      wrap: true,
                    }))}
                    onClick={linkTo(`${name}.properties`, toCapitalCase(prop.name))}
                  >
                    {prop.name}
                  </ReqoreButton>
                ))}
              </ReqoreControlGroup>
            </ReqoreColumn>
          ) : null}
          <ReqoreColumn flexFlow="column">
            <ReqoreH3>Methods</ReqoreH3>
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
                      label: useDocumentationTypeLabel(prop.returnTypes).type,
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
