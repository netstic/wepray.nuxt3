export interface ISession {
  prayedMessages: string[];
  currentCardIndex: number;
  currentProgress: number;
  isLoading: boolean;
  lists: ISessionItem[];
}

export interface ISessionItem {
  id: number;
  title: string;
  avatar: string;
  contentTitle: string;
  content: ISessionItemContent;
  notes: ISessionNote[];
  notesCount: number;
  comments: ISessionComment[];
  commentCount: number;
  prayedCount: number;
  isPrayed: boolean;
}

export interface ISessionItemContent {
  body?: string;
}

export interface ISessionList {
  id: number;
  title: string;
}

export interface ISessionNote {
  id: number;
  content: {
    body?: string;
  };
}

export interface ISessionComment {
  id: number;
  name: string;
  avatar: string | null;
  location: string | null;
  content: {
    body?: string;
  };
  reactions: { [key: string]: number };
  isShowReactions: boolean;
}
