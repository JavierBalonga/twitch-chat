export interface Message {
  id: string;
  username: string;
  displayName?: string;
  color: string;
  content: string;
  emotes: Emotes;
}

export interface Emotes {
  [id: string]: string[];
}
