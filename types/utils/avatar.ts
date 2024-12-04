// xs: 'Avatar-xs',
//   sm: 'Avatar-sm',
//   md: 'Avatar-md',
//   lg: 'Avatar-lg',

export interface IAvatarSize {
  xs: 'avatar-xs' | 'text-sm';
  sm: 'avatar-sm' | 'text-md';
  md: 'avatar-md' | 'text-lg';
  lg: 'avatar-lg' | 'text-xl';
  xl: 'avatar-xl' | 'text-2xl';
}

export type TAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TCustomClass =
  | string
  | string[]
  | Record<string, any>
  | Record<string, any>[];
