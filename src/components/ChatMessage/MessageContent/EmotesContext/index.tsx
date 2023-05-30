import { createContext, ReactNode, useContext, useMemo } from "react";
import { Emotes } from "../../../../contexts/messagesStore";

export type EmotesDictionary = {
  [name: string]: string | undefined;
};

const Context = createContext<EmotesDictionary | null>(null);

export interface EmotesContextProviderProps {
  children: ReactNode;
  emotes: Emotes;
  content: string;
}

export const EmotesContextProvider = ({
  children,
  emotes,
  content,
}: EmotesContextProviderProps) => {
  const emotesDictionary = useMemo(() => {
    const emotesDictionary: EmotesDictionary = {};

    Object.entries(emotes).forEach(([id, rawPositions]) => {
      const [start, end] = rawPositions[0].split("-");
      const name = content.slice(Number(start), Number(end) + 1);
      emotesDictionary[name] = id;
    });

    return emotesDictionary;
  }, [emotes, content]);

  return (
    <Context.Provider value={emotesDictionary}>{children}</Context.Provider>
  );
};

export const useEmotesContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      "useEmotesContext has to be inside a EmotesContextProvider"
    );
  }
  return context;
};
