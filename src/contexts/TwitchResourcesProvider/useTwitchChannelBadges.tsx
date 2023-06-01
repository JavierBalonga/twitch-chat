import { useQuery } from "react-query";
import { useTwitchAuth } from "../TwitchAuthProvider";
import twitchApi from "./twitchApi";

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
    },
  });
};

export default useTwitchChannelBadges;
