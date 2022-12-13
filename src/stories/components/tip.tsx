import { ReqoreMessage } from '@qoretechnologies/reqore';

export interface IDocumentationTipProps {
  children: any;
}

export const DocumentationTip = ({ children }: IDocumentationTipProps) => {
  return (
    <ReqoreMessage
      size="small"
      effect={{
        gradient: { direction: 'to right bottom', colors: { 0: '#7f4098', 100: '#46115b' } },
        color: '#ffffff ',
      }}
      icon="InformationLine"
      flat
    >
      {children}
    </ReqoreMessage>
  );
};
