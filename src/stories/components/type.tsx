import { ReqorePanel, ReqoreTag, ReqoreTagGroup } from '@qoretechnologies/reqore';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';
import useDocumentationTypeLabel from '../hooks/useDocumentationTypeLabel';
import { MethodReturnType } from '../types';
import { toCapitalCase } from '../utils';

export type TTypeLabel = MethodReturnType | MethodReturnType[] | string | string[] | { type: string } | undefined;

export interface IDocumentationType extends Omit<IReqoreTagProps, 'label'> {
  link?: string;
  label: TTypeLabel;
}

export const DocumentationType = ({ link, label, ...rest }: IDocumentationType) => {
  const { type, isLinkable, info } = useDocumentationTypeLabel(label);

  return (
    <ReqoreTag
      {...rest}
      label={type}
      intent={isLinkable ? 'info' : rest.intent}
      color={type === 'undefined' || type === 'null' ? '#111111' : rest.color}
      rightIcon={isLinkable ? 'Link' : undefined}
      onClick={
        isLinkable && info ? linkTo('params' in info ? `interfaces` : 'types', toCapitalCase(type)) : rest.onClick
      }
      tooltip={
        info
          ? {
              content: (
                <ReqorePanel minimal label={'params' in info ? 'Interface' : 'Type'} headerSize={3} flat>
                  {info.comments?.summary ? info.comments?.summary : null}
                  {'params' in info
                    ? info.params?.map((param) => (
                        <ReqoreTagGroup size="small">
                          <ReqoreTag
                            icon="CodeLine"
                            labelKey={param.label}
                            label={useDocumentationTypeLabel(param.type)?.type}
                          />
                        </ReqoreTagGroup>
                      ))
                    : null}
                  {'type' in info ? (
                    <ReqoreTagGroup size="small">
                      <ReqoreTag icon="CodeLine" label={useDocumentationTypeLabel(info.type)?.type} />
                    </ReqoreTagGroup>
                  ) : undefined}
                </ReqorePanel>
              ),
            }
          : undefined
      }
    />
  );
};
