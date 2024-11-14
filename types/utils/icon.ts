// xs: 'icon-xs',
//   sm: 'icon-sm',
//   md: 'icon-md',
//   lg: 'icon-lg',

export interface IIconSize {
  xs: 'icon-xs';
  sm: 'icon-sm';
  md: 'icon-md';
  lg: 'icon-lg';
  xl: 'icon-xl';
}

export type TIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TCustomClass =
  | string
  | string[]
  | Record<string, any>
  | Record<string, any>[];
