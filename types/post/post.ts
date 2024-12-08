export interface IDataPost {
  code: number;
  current_page: number;
  data: IPost[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: number | null;
  to: number;
  total: number;
}

export interface IPost {
  id: number;
  channel_id: number;
  user_id: number;
  category_id: null;
  text: IPostText;
  type: EPostType;
  acl: number;
  atendido: number | null;
  dataatendido: Date | null;
  status: null;
  rank: null;
  score: null;
  counter: number;
  commentCount: number;
  created_at: Date;
  updated_at: Date;
  view_type: TPostViewType;
  guid: null;
  updated_owner_at: Date;
  sensitive: boolean;
  is_like: boolean;
  is_bookmark: boolean;
  category: null;
  user: IPostUser;
}

export interface IPostText {
  body: string;
}

export enum EPostType {
  Request = 'REQUEST',
  Thank = 'THANK',
}

export interface IPostUser {
  id: number;
  username: string;
  name: string;
  img_show: boolean;
  avatar: string;
  avatars: IPostAvatars;
  profile: string;
}

export interface IPostUserPrayed {
  id: number;
  name: string;
  counter: number;
  post_id: number;
  user_id: number;
  username?: string;
}

export interface IPostAvatars {
  x60: string;
  x152: string;
  x600: string;
}

export enum TPostViewType {
  Text = 'TEXT',
}
