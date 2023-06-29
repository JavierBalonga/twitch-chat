import { createContext, ReactNode, useContext } from "react";
import useTwitchGlobalBadges, {
  TwitchGlobalBadges,
} from "./useTwitchGlobalBadges";
import useTwitchMessages from "./useTwitchChannelMessages";
import { Message } from "./messagesStore";

const CHANNEL_NAME = "metalitodev";

export interface TwitchResourcesContext {
  messages: Message[];
  globalBadges: TwitchGlobalBadges | undefined;
  globalBadgesIsLoading: boolean;
  globalBadgesError: unknown;
}

const Context = createContext<TwitchResourcesContext | null>(null);

export interface TwitchResourcesProviderProps {
  children: ReactNode;
}

export const TwitchResourcesProvider = ({
  children,
}: TwitchResourcesProviderProps) => {
  const twitchGlobalBadges = useTwitchGlobalBadges();
  const messages = useTwitchMessages({ channelName: CHANNEL_NAME });

  return (
    <Context.Provider
      value={{
        messages,
        globalBadges: twitchGlobalBadges.data,
        globalBadgesIsLoading: twitchGlobalBadges.isLoading,
        globalBadgesError: twitchGlobalBadges.error,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTwitchResources = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      "useTwitchResources has to be inside a TwitchResourcesProvider"
    );
  }
  return context;
};
