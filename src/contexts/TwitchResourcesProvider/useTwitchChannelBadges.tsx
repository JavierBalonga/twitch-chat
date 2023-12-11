import { useQuery } from "react-query";
import { useTwitchAuth } from "../TwitchAuthProvider";
import twitchApi from "./twitchApi";
import { AxiosError } from "axios";

export interface useTwitchChannelBadgesOptions {
  broadcasterId?: string;
}

const useTwitchChannelBadges = ({
  broadcasterId,
}: useTwitchChannelBadgesOptions) => {
  const twitchAuth = useTwitchAuth();
  return useQuery({
    queryKey: "twitch-channel-badges",
    enabled:
      twitchAuth.isAuthenticated &&
      Boolean(twitchAuth.accessToken) &&
      Boolean(broadcasterId),
    queryFn: async () => {
      try {
        if (!twitchAuth.accessToken) {
          throw new Error("No Twitch access token found");
        }
        const { data } = await twitchApi.get("/chat/badges", {
          headers: {
            Authorization: `Bearer ${twitchAuth.accessToken}`,
          },
          params: {
            broadcaster_id: broadcasterId,
          },
        });
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            twitchAuth.logout();
            twitchAuth.goToLogin();
          }
        }
        throw error;
      }
    },
  });
};

export default useTwitchChannelBadges;
