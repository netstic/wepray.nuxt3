import type { IAvatarSize, TAvatarSize } from '~/types/utils/avatar';

export enum EAvatarSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

const avatarSizes: IAvatarSize = {
  [EAvatarSize.XS]: 'avatar-xs',
  [EAvatarSize.SM]: 'avatar-sm',
  [EAvatarSize.MD]: 'avatar-md',
  [EAvatarSize.LG]: 'avatar-lg',
  [EAvatarSize.XL]: 'avatar-xl',
};

export const getAvatarSize = (size: TAvatarSize) => {
  return avatarSizes[size] ?? 'avatar-md';
};
