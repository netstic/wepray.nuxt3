export interface ISession {
  currentCardIndex: number;
  currentProgress: number;
  prayerCount: number;
  isLoading: boolean;
  lists: ISessionItem[];
}

export interface ISessionItem {
  id: number;
  avatar: string;
  title: string;
  content: string;
  notes: ISessionNote[];
  comments: ISessionComment[];
  prayedCount: number;

  list: ISessionList;
}

export interface ISessionList {
  id: number;
  title: string;
}

export interface ISessionNote {
  id: number;
  content: string;
}

export interface ISessionComment {
  id: number;
  name: string;
  avatar: string;
  location: string;
  content: string;
  reactions: { [key: string]: number };
  showReactions: boolean;
}
