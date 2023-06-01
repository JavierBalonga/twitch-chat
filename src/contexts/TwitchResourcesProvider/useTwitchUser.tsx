import { useQuery } from "react-query";
import { useTwitchAuth } from "../../contexts/TwitchAuthProvider";
import twitchApi from "./twitchApi";

export interface TwitchChannelUserResponse {
  data: TwitchUser[];
}

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: Date;
}

export interface useTwitchChannelUserOptions {
  username: string;
}

const useTwitchUser = ({ username }: useTwitchChannelUserOptions) => {
  const twitchAuth = useTwitchAuth();
  return useQuery({
    queryKey: `twitch-channel-user-${username}`,
    enabled: twitchAuth.isAuthenticated && Boolean(twitchAuth.accessToken),
    staleTime: Infinity,
    queryFn: async () => {
      if (!twitchAuth.accessToken) {
        throw new Error("No Twitch access token found");
      }
      const { data } = await twitchApi.get<TwitchChannelUserResponse>(
        "/users",
        {
          headers: {
            Authorization: `Bearer ${twitchAuth.accessToken}`,
          },
          params: {
            login: username,
          },
        }
      );
      return data.data[0];
    },
  });
};

export default useTwitchUser;
