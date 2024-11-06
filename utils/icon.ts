import type { IIconSize, TIconSize } from '~/types/utils/icon';

export enum EIconSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const iconSizes: IIconSize = {
  [EIconSize.XS]: 'icon-xs',
  [EIconSize.SM]: 'icon-sm',
  [EIconSize.MD]: 'icon-md',
  [EIconSize.LG]: 'icon-lg',
};

export const getIconSize = (size: TIconSize) => {
  return iconSizes[size] ?? 'icon-md';
};
