import { ReqoreMessage, ReqoreSpacer, ReqoreTag, ReqoreTagGroup } from '@qoretechnologies/reqore';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';
import useDocumentationTypeLabel from '../hooks/useDocumentationTypeLabel';
import { IMethodReturnType } from '../types';
import { toCapitalCase } from '../utils';

export type TTypeLabel = IMethodReturnType | IMethodReturnType[] | string | string[] | { type: string } | undefined;

export interface IDocumentationType extends Omit<IReqoreTagProps, 'label'> {
  link?: string;
  label: TTypeLabel;
}

export const DocumentationType = ({ link, label, ...rest }: IDocumentationType) => {
  const { type, isLinkable, info, linkableType } = useDocumentationTypeLabel(label);
  const onClick = linkTo(
    linkableType.startsWith('Qorus') ? linkableType : info && 'params' in info ? `interfaces` : 'types',
    linkableType.startsWith('Qorus') ? 'overview' : toCapitalCase(linkableType),
  );

  console.log(info);

  return (
    <ReqoreTag
      {...rest}
      label={type}
      intent={isLinkable ? 'info' : rest.intent}
      color={type === 'undefined' || type === 'null' ? '#111111' : rest.color}
      rightIcon={isLinkable ? 'Link' : undefined}
      onClick={isLinkable && info ? onClick : rest.onClick}
      wrap
      tooltip={
        info && ('params' in info || 'type' in info)
          ? {
              flat: false,
              handler: 'hover',
              delay: 200,

              content: (
                <ReqoreMessage flat opaque title={'params' in info ? 'Interface' : 'Type'}>
                  {info.comments?.summary ? info.comments?.summary : null}
                  <ReqoreSpacer height={10} />

                  {'params' in info ? (
                    <>
                      <ReqoreTagGroup>
                        <ReqoreTag labelKey="{" intent="muted" />
                        {info.params?.map((param) => (
                          <ReqoreTagGroup>
                            <ReqoreSpacer width={20} style={{ display: 'inline-block' }} />
                            <ReqoreTag
                              intent="muted"
                              icon="CodeLine"
                              labelKey={`${param.label}:`}
                              label={useDocumentationTypeLabel(param.type)?.type}
                            />
                          </ReqoreTagGroup>
                        ))}
                        <ReqoreTag labelKey="}" intent="muted" />
                      </ReqoreTagGroup>
                    </>
                  ) : null}

                  <ReqoreTagGroup>
                    {'type' in info ? (
                      <ReqoreTag intent="muted" icon="CodeLine" label={useDocumentationTypeLabel(info.type)?.type} />
                    ) : undefined}
                  </ReqoreTagGroup>
                </ReqoreMessage>
              ),
            }
          : undefined
      }
    />
  );
};
