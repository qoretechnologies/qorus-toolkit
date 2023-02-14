import { isArray, isObject, isUndefined } from 'lodash';
import { TTypeLabel } from '../components/type';
import { IReturnType } from '../types';
import { getTypeOrInterfaceData, isCapitalized } from '../utils';

export interface ITypeLabel {
  type: string;
  linkableType: string;
  isLinkable: boolean;
  info?: any;
}
/*eslint-disable */

export const transformTypeLabel = (label: TTypeLabel): string =>
  isUndefined(label)
    ? 'void'
    : isArray(label)
    ? isObject(label[0])
      ? (label as IReturnType[]).reduce((newType, l) => `${newType ? `${newType} | ` : ''}${l.fullType}`, '')
      : label.join(' | ')
    : isObject(label)
    ? (label as IReturnType).fullType || ((label as IReturnType).type as string)
    : label;

export default function (label: TTypeLabel): ITypeLabel {
  const type: string = transformTypeLabel(label);
  const isLinkable: boolean = isCapitalized(type) && type !== 'T' && !type.startsWith('Record');
  const linkableType = type.replace('[ ]', '');

  if (isLinkable) {
    return { type, isLinkable, info: getTypeOrInterfaceData(linkableType), linkableType };
  }

  return { type, isLinkable, linkableType };
}
