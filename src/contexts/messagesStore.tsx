import { create } from "zustand";
import { persist } from "zustand/middleware";

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
}

export interface Emotes {
  [id: string]: string[];
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

// import { useAtom } from 'jotai'
// import { atomWithStorage } from 'jotai/utils'

// const darkModeAtom = atomWithStorage('darkMode', false)

// const Page = () => {
//   const [darkMode, setDarkMode] = useAtom(darkModeAtom)

//   return (
//     <>
//       <h1>Welcome to {darkMode ? 'dark' : 'light'} mode!</h1>
//       <button onClick={() => setDarkMode(!darkMode)}>toggle theme</button>
//     </>
//   )
// }
