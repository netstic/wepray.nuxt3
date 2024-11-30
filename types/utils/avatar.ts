// xs: 'Avatar-xs',
//   sm: 'Avatar-sm',
//   md: 'Avatar-md',
//   lg: 'Avatar-lg',

export interface IAvatarSize {
  xs: 'avatar-xs';
  sm: 'avatar-sm';
  md: 'avatar-md';
  lg: 'avatar-lg';
  xl: 'avatar-xl';
}

export type TAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TCustomClass =
  | string
  | string[]
  | Record<string, any>
  | Record<string, any>[];
