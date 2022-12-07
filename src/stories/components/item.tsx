import { ReqoreCollection, ReqorePanel, ReqoreSpacer, ReqoreTagGroup } from '@qoretechnologies/reqore';
import { IReqoreCollectionItemProps } from '@qoretechnologies/reqore/dist/components/Collection/item';
import { IReqorePanelProps } from '@qoretechnologies/reqore/dist/components/Panel';
import ReqoreTag, { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { map } from 'lodash';
import { IDocumentationParam, TDocumentationParams, TDocumentationReturns } from '../types';

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

        {params || returns || true ? (
          <>
            <ReqoreSpacer height={10} />
            <ReqoreCollection
              size="small"
              label="Params"
              //@ts-ignore
              minimal
              headerSize={4}
              sortable
              filterable
              items={map(
                params,
                (param): IReqoreCollectionItemProps => ({
                  label: param.label,
                  content: param.description,
                  headerSize: 4,
                  tags: buildTags(param),
                  customTheme: { main: '#444444' },
                }),
              )}
            />
            <ReqorePanel label="Returns" minimal headerSize={4} flat opacity={0}>
              {returns?.description}
              <ReqoreSpacer height={10} />
              <ReqoreTagGroup size="small">
                {returns?.types.map((type) => (
                  <ReqoreTag
                    {...{
                      labelKey: 'Type',
                      icon: 'CodeLine',
                      label: type.label || 'string',
                      intent: type.link ? 'info' : type.intent,
                      rightIcon: type.link ? 'Link' : undefined,
                    }}
                  />
                ))}
              </ReqoreTagGroup>
            </ReqorePanel>
          </>
        ) : null}
      </ReqorePanel>
      <ReqoreSpacer height={20} />
    </>
  );
};
