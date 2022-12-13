import { ReqoreTag } from '@qoretechnologies/reqore';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';
import { isObject } from 'lodash';

export interface IDocumentationType extends Omit<IReqoreTagProps, 'label'> {
  link?: string;
  label: string | { type: string };
}

export const DocumentationType = ({ link, label, ...rest }: IDocumentationType) => {
  const transformedLabel: string = isObject(label) ? (label.type as string) : (label as string);

  console.log(label);

  return (
    <ReqoreTag
      {...rest}
      label={transformedLabel}
      intent={link ? 'info' : rest.intent}
      color={transformedLabel === 'undefined' || transformedLabel === 'null' ? '#111111' : rest.color}
      rightIcon={link ? 'Link' : undefined}
      onClick={link ? linkTo(link) : rest.onClick}
    />
  );
};
