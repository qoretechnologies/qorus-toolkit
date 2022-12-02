import { ReqoreCollection, ReqorePanel, ReqoreSpacer, ReqoreTagGroup } from '@qoretechnologies/reqore';
import { IReqoreCollectionItemProps } from '@qoretechnologies/reqore/dist/components/Collection/item';
import { IReqorePanelProps } from '@qoretechnologies/reqore/dist/components/Panel';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { map } from 'lodash';
import { IDocumentationParam, TDocumentationParams, TDocumentationReturns } from '../types';
import { DocumentationType } from './type';

export interface IDocumentationItemsProps extends IReqorePanelProps {
  params?: TDocumentationParams;
  returns?: TDocumentationReturns;
}

export const DocumentationItem = ({ children, params, returns, ...rest }: IDocumentationItemsProps) => {
  const buildTags = (param: IDocumentationParam): IReqoreTagProps[] => {
    const tags: IReqoreTagProps[] = [
      {
        labelKey: 'Type',
        icon: 'CodeLine',
        label: param.type || 'string',
        intent: param.link ? 'info' : undefined,
        rightIcon: param.link ? 'Link' : undefined,
      },
    ];

    if (param.optional) {
      tags.push({ icon: 'QuestionMark', labelKey: 'Optional', label: 'Yes', rightIcon: 'CheckFill' });
    }

    return tags;
  };

  return (
    <>
      <ReqorePanel flat headerSize={3} collapsible {...rest}>
        {children}
      </ReqorePanel>
      {params || returns || true ? (
        <>
          <ReqoreSpacer height={20} />
          <ReqoreCollection
            size="small"
            label="Params"
            items={map(
              params,
              (param, key: string): IReqoreCollectionItemProps => ({
                label: param.label,
                content: param.description,
                headerSize: 4,
                tags: buildTags(param),
              }),
            )}
          />
          <ReqorePanel minimal label="Returns" flat opacity={0} headerSize={2}>
            <ReqoreTagGroup size="normal">
              {map(returns, (returnType, key: string) => (
                <DocumentationType size="normal" {...returnType} key={key} />
              ))}
            </ReqoreTagGroup>
          </ReqorePanel>
        </>
      ) : null}
      <ReqoreSpacer height={20} />
    </>
  );
};
