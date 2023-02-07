import {
  ReqoreCollection,
  ReqoreH1,
  ReqoreMessage,
  ReqorePanel,
  ReqoreSpacer,
  ReqoreTagGroup,
  ReqoreTextEffect,
} from '@qoretechnologies/reqore';
import { IReqoreCollectionItemProps } from '@qoretechnologies/reqore/dist/components/Collection/item';
import { IReqoreEffect } from '@qoretechnologies/reqore/dist/components/Effect';
import { IReqorePanelProps } from '@qoretechnologies/reqore/dist/components/Panel';
import { map, size } from 'lodash';
import { IComments, IMethodParamTypes, IMethodReturnType, IReturnType } from '../types';
import { DocumentationHashType, DocumentationType } from './type';

export interface IDocumentationItemsProps extends IReqorePanelProps {
  params?: IMethodParamTypes[];
  returnTypes?: IMethodReturnType[];
  async?: boolean;
  name?: string;
  label?: string;
  comment?: IComments;
  returnSummary?: string | null;
  type?: IReturnType | IReturnType[];
  parent?: string;
}

export const asyncEffect: IReqoreEffect = {
  gradient: {
    direction: 'to right bottom',
    colors: '#ff9500',
  },
};

export const DocumentationItem = ({
  children,
  params,
  returnTypes,
  name,
  comment,
  returnSummary,
  parent,
  label,
  ...rest
}: IDocumentationItemsProps) => {
  return (
    <>
      <ReqorePanel flat opacity={0} headerSize={1} {...rest}>
        <ReqoreH1>
          <ReqoreTextEffect effect={{ color: '#787878' }}>{parent ? `${parent}.` : ``}</ReqoreTextEffect>
          {name}
        </ReqoreH1>
        <ReqoreSpacer height={20} />
        {children && (
          <>
            <ReqoreMessage intent="info">{children}</ReqoreMessage>
            <ReqoreSpacer height={30} />
          </>
        )}
        {label && (
          <ReqorePanel minimal transparent flat headerSize={3} label="Signature">
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
              <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces', margin: 0 }}>{label}</pre>
            </ReqoreMessage>
          </ReqorePanel>
        )}
        {size(params) ? (
          <>
            <ReqoreCollection
              label={`Params`}
              headerSize={3}
              badge={size(params)}
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
                      <DocumentationHashType type={param.type} />
                    </>
                  ),
                  headerSize: 4,
                  flat: false,
                  contentEffect: {
                    gradient: {
                      direction: 'to right bottom',
                      colors: {
                        100: '#2e2e2e',
                        0: '#000000',
                      },
                    },
                  },
                }),
              )}
            />
          </>
        ) : null}
        {rest.type && (
          <ReqorePanel label="Type" minimal headerSize={3} flat opacity={0} padded={false}>
            <DocumentationHashType type={rest.type} />
          </ReqorePanel>
        )}
        {size(returnTypes) ? (
          <ReqorePanel label="Returns" minimal headerSize={3} flat opacity={0} padded={false}>
            {rest.async && (
              <ReqoreMessage icon="ClockwiseLine" minimal effect={asyncEffect}>
                This method is asynchronous and returns a Promise
              </ReqoreMessage>
            )}
            <ReqoreSpacer height={15} />
            {returnSummary && (
              <>
                {returnSummary}
                <ReqoreSpacer height={15} />
              </>
            )}
            <ReqoreTagGroup>
              {returnTypes?.map((type) => (
                <DocumentationType
                  key={type.label}
                  {...{
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
