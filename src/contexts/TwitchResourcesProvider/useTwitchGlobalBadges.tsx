import { useQuery } from "react-query";
import { useTwitchAuth } from "../../contexts/TwitchAuthProvider";
import twitchApi from "./twitchApi";
import { AxiosError } from "axios";

// TODO This hook is not used anywhere in the app.
// Will be used in the future to display the channel badges when there is almost one.

export interface TwitchGlobalBadgesResponse {
  data: TwitchBadge[];
}

export interface TwitchGlobalBadges {
  [id: string]: {
    [version: string]: TwitchBadgeVersion;
  };
}

export interface TwitchBadge {
  set_id: string;
  versions: TwitchBadgeVersion[];
}

export interface TwitchBadgeVersion {
  id: string;
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
  title: string;
  description: string;
  click_action: ClickAction | null;
  click_url: null | string;
}

export enum ClickAction {
  SubscribeToChannel = "subscribe_to_channel",
  Turbo = "turbo",
  VisitURL = "visit_url",
}

const useTwitchGlobalBadges = () => {
  const twitchAuth = useTwitchAuth();
  return useQuery({
    queryKey: "twitch-global-badges",
    enabled: twitchAuth.isAuthenticated && Boolean(twitchAuth.accessToken),
    queryFn: async () => {
      try {
        if (!twitchAuth.accessToken) {
          throw new Error("No Twitch access token found");
        }
        const { data } = await twitchApi.get<TwitchGlobalBadgesResponse>(
          "/chat/badges/global",
          {
            headers: {
              Authorization: `Bearer ${twitchAuth.accessToken}`,
            },
          }
        );
        const badges: TwitchGlobalBadges = {};
        data.data.forEach((badge) => {
          if (!badges[badge.set_id]) {
            badges[badge.set_id] = {};
          }
          badge.versions.forEach((version) => {
            badges[badge.set_id][version.id] = version;
          });
        });
        return badges;
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

export default useTwitchGlobalBadges;
