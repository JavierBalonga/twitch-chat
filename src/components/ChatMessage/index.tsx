import { useMemo } from "react";
import clsx from "clsx";
import MessageContent from "./MessageContent";
import Color from "color";
import { Message } from "../../contexts/TwitchResourcesProvider/messagesStore";
import { useTwitchResources } from "../../contexts/TwitchResourcesProvider";
import useTwitchUser from "../../contexts/TwitchResourcesProvider/useTwitchUser";

const BACKDROP_COLOR = "#242739";
const MINIMUM_CONTRAST = 4;

export interface ChatMessageProps {
  message: Message;
  isUsersFirstMessage?: boolean;
  isUsersLastMessage?: boolean;
}

const ChatMessage = ({
  message,
  isUsersFirstMessage = false,
  isUsersLastMessage = false,
}: ChatMessageProps) => {
  const { globalBadges } = useTwitchResources();
  const { data: twitchUserProfile } = useTwitchUser({
    username: message.username,
  });
  const messageColor = useMemo(() => {
    const backdropColor = Color(BACKDROP_COLOR);
    let color = Color(message.color);
    let index = 0;
    while (backdropColor.contrast(color) < MINIMUM_CONTRAST) {
      if (color.saturationl() < 100) {
        color = color.saturationl(Math.round(color.saturationl()) + 1);
      } else if (color.lightness() < 255) {
        color = color.lightness(Math.round(color.lightness()) + 1);
      }
      if (index === 510) break;
      index++;
    }
    return color.hex();
  }, [message.color]);

  return (
    <div className={clsx("flex gap-3 ", isUsersFirstMessage && "mt-4")}>
      <div className="flex-shrink-0 w-[50px]">
        {isUsersFirstMessage && twitchUserProfile?.profile_image_url && (
          <img
            className="w-full rounded-full"
            src={twitchUserProfile.profile_image_url}
            alt={message.username}
          />
        )}
      </div>
      <div className="grow flex flex-col gap-1">
        {isUsersFirstMessage && (
          <div
            className="self-start px-2 py-1 rounded-lg flex items-center gap-1"
            style={{ backgroundColor: BACKDROP_COLOR }}
          >
            {globalBadges &&
              Object.entries(message.badges).map(([name, version]) => {
                if (!version) return null;
                const badge = globalBadges[name]?.[version];
                if (!badge) return null;
                return (
                  <img
                    key={name}
                    src={badge.image_url_1x}
                    alt={name}
                    className="inline h-[18px] mr-1"
                  />
                );
              })}
            <h6 className="text-xl" style={{ color: messageColor }}>
              {message.displayName || message.username}
            </h6>
          </div>
        )}
        <div
          className={clsx(
            "px-6 bg-background text-primary break-all",
            isUsersFirstMessage && "rounded-tr-3xl rounded-tl-none pt-3",
            isUsersLastMessage && "rounded-b-3xl pb-3"
          )}
        >
          {!isUsersFirstMessage && (
            <div className="bg-white/10 h-[2px] mt-3 mb-2" />
          )}
          <MessageContent content={message.content} emotes={message.emotes} />
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
