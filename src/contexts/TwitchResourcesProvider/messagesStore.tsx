import { create } from "zustand";

export interface MessagesState {
  messages: Message[];
}

export interface MessagesMethods {
  addMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
}

export interface Message {
  id: string;
  username: string;
  displayName?: string;
  color: string;
  content: string;
  emotes: Emotes;
  badges: Badges;
}

export interface Emotes {
  [id: string]: string[];
}

export interface Badges {
  [name: string]: string | undefined;
}

const useMessagesStore = create<MessagesState & MessagesMethods>((set) => ({
  messages: [],
  addMessage: (message) => {
    set((state) => ({
      messages: state.messages.concat(message),
    }));
  },
  removeMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    }));
  },
}));

export default useMessagesStore;
