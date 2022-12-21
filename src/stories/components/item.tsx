import { ReqoreCollection, ReqoreMessage, ReqorePanel, ReqoreSpacer, ReqoreTagGroup } from '@qoretechnologies/reqore';
import { IReqoreCollectionItemProps } from '@qoretechnologies/reqore/dist/components/Collection/item';
import { IReqorePanelProps } from '@qoretechnologies/reqore/dist/components/Panel';
import { map, size } from 'lodash';
import { Comments, MethodParamTypes, MethodReturnType } from '../types';
import { DocumentationType } from './type';

export interface IDocumentationItemsProps extends IReqorePanelProps {
  params?: MethodParamTypes[];
  returnTypes?: MethodReturnType[];
  async?: boolean;
  name?: string;
  label?: string;
  comment?: Comments;
  returnSummary?: string | null;
}

export const DocumentationItem = ({
  children,
  params,
  returnTypes,
  name,
  comment,
  returnSummary,
  ...rest
}: IDocumentationItemsProps) => {
  return (
    <>
      <ReqorePanel flat opacity={0} headerSize={1} {...rest} label={name}>
        {children && (
          <ReqoreMessage
            inverted
            intent="info"
            effect={{
              color: '#ffffff',
            }}
          >
            {children}
          </ReqoreMessage>
        )}
        <ReqoreSpacer height={30} />
        {rest.label && (
          <ReqorePanel minimal opacity={0} headerSize={4} label="Signature">
            <ReqoreMessage
              icon="CodeLine"
              effect={{
                gradient: {
                  direction: 'to right bottom',
                  colors: {
                    100: '#2e2e2e',
                    0: 'transparent',
                  },
                },
                color: '#ffffff',
              }}
            >
              <pre>{rest.label}</pre>
            </ReqoreMessage>
          </ReqorePanel>
        )}
        {size(params) ? (
          <>
            <ReqoreCollection
              size="small"
              label={`Params (${size(params)})`}
              headerSize={4}
              sortable={size(params) > 2}
              filterable={size(params) > 2}
              items={map(
                params,
                (param): IReqoreCollectionItemProps => ({
                  label: param.label,
                  content: (
                    <>
                      {param.description}
                      <ReqoreSpacer height={20} />
                      <ReqoreTagGroup>
                        <DocumentationType
                          {...param}
                          {...{
                            icon: 'CodeLine',
                            label: param.type || 'string',
                            size: 'normal',
                          }}
                        />
                      </ReqoreTagGroup>
                    </>
                  ),
                  headerSize: 4,
                  flat: false,
                  contentEffect: {
                    gradient: {
                      direction: 'to right bottom',
                      colors: {
                        100: '#2e2e2e',
                        0: 'transparent',
                      },
                    },
                  },
                }),
              )}
            />
          </>
        ) : null}
        {size(returnTypes) ? (
          <ReqorePanel label="Returns" minimal headerSize={4} flat opacity={0} padded={false}>
            {rest.async && (
              <ReqoreMessage
                customTheme={{ main: '#ff9600' }}
                icon="ClockwiseLine"
                inverted
                size="small"
                effect={{
                  gradient: {
                    direction: 'to right bottom',
                    colors: {
                      0: '#ff95007c',
                      100: 'transparent',
                    },
                  },
                  color: '#ffffff',
                }}
              >
                This method is asynchronous and returns a Promise
              </ReqoreMessage>
            )}
            <ReqoreSpacer height={15} />
            {returnSummary}
            <ReqoreSpacer height={15} />
            <ReqoreTagGroup>
              {returnTypes?.map((type) => (
                <DocumentationType
                  {...{
                    icon: 'CodeLine',
                    label: type.label || 'string',
                  }}
                />
              ))}
            </ReqoreTagGroup>
          </ReqorePanel>
        ) : null}
      </ReqorePanel>
    </>
  );
};
