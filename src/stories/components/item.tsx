import { ReqoreColumns, ReqorePanel, ReqoreSpacer, ReqoreTagGroup } from '@qoretechnologies/reqore';
import { IReqorePanelProps } from '@qoretechnologies/reqore/dist/components/Panel';
import { map } from 'lodash';
import { TDocumentationParams, TDocumentationReturns } from '../types';
import { DocumentationType } from './type';

export interface IDocumentationItemsProps extends IReqorePanelProps {
  params?: TDocumentationParams;
  returns?: TDocumentationReturns;
}

export const DocumentationItem = ({ children, params, returns, ...rest }: IDocumentationItemsProps) => {
  return (
    <>
      <ReqorePanel flat headerSize={3} collapsible {...rest}>
        {children}
        {params || returns || true ? (
          <>
            <ReqoreSpacer height={20} />
            <ReqoreColumns columnsGap="15px">
              <ReqorePanel minimal label="Params">
                <ReqoreTagGroup size="normal">
                  {map(params, (param, key: string) => (
                    <DocumentationType size="normal" labelKey={key} {...param} key={key} />
                  ))}
                </ReqoreTagGroup>
              </ReqorePanel>
              <ReqorePanel minimal label="Returns">
                <ReqoreTagGroup size="normal">
                  {map(returns, (returnType, key: string) => (
                    <DocumentationType size="normal" {...returnType} key={key} />
                  ))}
                </ReqoreTagGroup>
              </ReqorePanel>
            </ReqoreColumns>
          </>
        ) : null}
      </ReqorePanel>
      <ReqoreSpacer height={20} />
    </>
  );
};
