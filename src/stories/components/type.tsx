import { ReqoreControlGroup, ReqoreMessage, ReqoreSpacer, ReqoreTag, ReqoreTagGroup } from '@qoretechnologies/reqore';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';
import { size } from 'lodash';
import useDocumentationTypeLabel from '../hooks/useDocumentationTypeLabel';
import { IMethodParamTypes, IMethodReturnType, IReturnType } from '../types';
import { toCapitalCase } from '../utils';

export type TTypeLabel = IMethodReturnType | IMethodReturnType[] | string | string[] | { type: string } | undefined;

export interface IDocumentationType extends Omit<IReqoreTagProps, 'label'> {
  link?: string;
  label: TTypeLabel;
}

export interface IDocumentationHashType {
  type: IMethodParamTypes['type'];
}

export const DocumentationHashType = ({ type }: IDocumentationHashType) => {
  const formattedType: (IReturnType | string)[] = type ? (Array.isArray(type) ? type : [type]) : [];

  // Takes a string or an array of strings and returns an array of strings
  const getTypeList = (stringType: string | string[]) => (Array.isArray(stringType) ? stringType : [stringType]);

  return (
    <>
      {formattedType.map((typeData, index) =>
        typeof typeData === 'string' ? (
          <ReqoreTagGroup key={index}>
            <DocumentationType
              {...{
                label: typeData || 'unknown',
              }}
            />
          </ReqoreTagGroup>
        ) : (
          <ReqoreTagGroup key={index}>
            {typeData.masterType && (
              <ReqoreTag label={typeData.masterType} rightIcon="ArrowLeftSLine" color="main:lighten:2" />
            )}
            {getTypeList(typeData.type).map((actualType, index) => (
              <>
                <DocumentationType
                  {...{
                    label: actualType || 'unknown',
                  }}
                />
                {index !== size(getTypeList(typeData.type)) - 1 && typeData.separatorSymbol ? (
                  <ReqoreTag label={typeData.separatorSymbol} color="transparent" />
                ) : null}
              </>
            ))}
            {typeData.masterType && <ReqoreTag rightIcon="ArrowRightSLine" color="main:lighten:2" />}
          </ReqoreTagGroup>
        ),
      )}
    </>
  );
};

export const DocumentationType = ({ link, label, ...rest }: IDocumentationType) => {
  const { type, isLinkable, info, linkableType } = useDocumentationTypeLabel(label);
  const onClick = linkTo(
    linkableType.startsWith('Qorus') ? linkableType : info && 'params' in info ? `interfaces` : 'types',
    linkableType.startsWith('Qorus') ? 'overview' : toCapitalCase(linkableType),
  );

  return (
    <ReqoreTag
      {...rest}
      label={type}
      intent={isLinkable ? 'info' : rest.intent}
      color={type === 'undefined' || type === 'null' ? '#111111' : rest.color}
      rightIcon={isLinkable ? 'Link' : undefined}
      onClick={isLinkable && info ? onClick : rest.onClick}
      effect={{
        spaced: 2,
        textSize: 'small',
      }}
      wrap
      tooltip={
        info && ('params' in info || 'type' in info)
          ? {
              flat: false,
              handler: 'hoverStay',
              delay: 200,
              blur: true,

              content: (
                <ReqoreMessage flat opaque title={'params' in info ? 'Interface' : 'Type'}>
                  {info.comments?.summary ? info.comments?.summary : null}
                  <ReqoreSpacer height={10} />

                  {'params' in info ? (
                    <>
                      <ReqoreControlGroup vertical>
                        <ReqoreTag labelKey="{" intent="muted" />
                        {info.params?.map((param: IParamTypes) => (
                          <ReqoreTagGroup key={param.label} wrap={false}>
                            <ReqoreSpacer width={20} style={{ display: 'inline-block' }} />
                            <ReqoreTag labelKey={`${param.label}:`} intent="muted" />
                            <DocumentationHashType type={param.type} />
                          </ReqoreTagGroup>
                        ))}
                        <ReqoreTag labelKey="}" intent="muted" />
                      </ReqoreControlGroup>
                    </>
                  ) : null}

                  <ReqoreTagGroup>
                    {'type' in info ? <DocumentationHashType type={info.type} /> : undefined}
                  </ReqoreTagGroup>
                </ReqoreMessage>
              ),
            }
          : undefined
      }
    />
  );
};

export interface IParamTypes {
  type: string;
  label: string;
}
