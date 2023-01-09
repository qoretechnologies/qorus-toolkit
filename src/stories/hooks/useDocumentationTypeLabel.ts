import { isArray, isObject, isUndefined } from 'lodash';
import { TTypeLabel } from '../components/type';
import { IMethodReturnType } from '../types';
import { getTypeOrInterfaceData, isCapitalized } from '../utils';

export interface ITypeLabel {
  type: string;
  isLinkable: boolean;
  info?: any;
}
/*eslint-disable */

export const transformTypeLabel = (label: TTypeLabel): string =>
  isUndefined(label)
    ? 'void'
    : isArray(label)
    ? isObject(label[0])
      ? (label as IMethodReturnType[]).reduce((newType, l) => `${newType ? `${newType} | ` : ''}${l.label}`, '')
      : label.join(' | ')
    : isObject(label)
    ? (label as any).type || (label as any).label
    : label;

export default function (label: TTypeLabel) {
  const type: string = transformTypeLabel(label);
  const isLinkable: boolean = isCapitalized(type) && type !== 'T';

  if (isLinkable) {
    return { type, isLinkable, info: getTypeOrInterfaceData(type) };
  }

  return { type, isLinkable };
}
