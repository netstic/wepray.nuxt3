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

const avatarPlaceholderSizes: IAvatarSize = {
  [EAvatarSize.XS]: 'text-sm',
  [EAvatarSize.SM]: 'text-md',
  [EAvatarSize.MD]: 'text-lg',
  [EAvatarSize.LG]: 'text-xl',
  [EAvatarSize.XL]: 'text-2xl',
};

export const getAvatarSize = (size: TAvatarSize) => {
  return avatarSizes[size] ?? 'avatar-md';
};

export const getAvatarPlaceholderSize = (size: TAvatarSize) => {
  return avatarPlaceholderSizes[size] ?? 'text-lg';
};
