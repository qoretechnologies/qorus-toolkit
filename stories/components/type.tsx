import { ReqoreTag } from '@qoretechnologies/reqore';
import { IReqoreTagProps } from '@qoretechnologies/reqore/dist/components/Tag';
import { linkTo } from '@storybook/addon-links';

export interface IDocumentationType extends IReqoreTagProps {
  link?: string;
}

export const DocumentationType = ({ link, ...rest }: IDocumentationType) => {
  return (
    <ReqoreTag
      {...rest}
      size={rest.size || 'small'}
      intent={link ? 'info' : rest.intent}
      color={rest.label === 'undefined' || rest.label === 'null' ? '#111111' : rest.color}
      rightIcon={link ? 'Link' : undefined}
      onClick={link ? linkTo(link) : rest.onClick}
    />
  );
};
