export interface IPostPublicQuickPrayer {
  name: string | null;
  email: string | null;
  country: string | null;
  city: string | null;
  body: string | null;
  'g-recaptcha-response'?: string | null;
}

export interface IPostResponse {
  current_page: number;
  data: IPostPublic[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
  code: number;
}

export interface IPostPublic {
  id: number;
  channel_id: number;
  user_id: number;
  category_id: number | null;
  text: TextClass;
  type: Type;
  acl: number;
  atendido: null;
  dataatendido: null;
  status: null;
  rank: null | string;
  score: null | string;
  counter: number;
  commentCount: number;
  created_at: string;
  updated_at: string;
  view_type: ViewType;
  guid: null;
  updated_owner_at: string;
  sensitive: boolean;
  category: Category | null;
  user: User;
}

export interface Category {
  id: number;
  key: Key;
  text: TextEnum;
}

export enum Key {
  Public = 'public',
}

export enum TextEnum {
  Public = 'Public',
}

export interface TextClass {
  body: string;
  username?: null | string;
  origin?: null | string;
}

export enum Type {
  Request = 'REQUEST',
}

export interface User {
  id: number;
  username: string;
  name: string;
  img_show: boolean;
  avatar: string;
  avatars: Avatars;
  profile: string;
}

export interface Avatars {
  x60: string;
  x152: string;
  x600: string;
}

export enum ViewType {
  PublicRequest = 'PUBLIC_REQUEST',
  Text = 'TEXT',
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
