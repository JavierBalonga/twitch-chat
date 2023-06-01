import clsx from "clsx";
import MessageContent from "./MessageContent";
import Color from "color";
import { Message } from "../../contexts/TwitchResourcesProvider/messagesStore";
import { useTwitchResources } from "../../contexts/TwitchResourcesProvider";

const MINIMUM_LIGHTNESS = 0.5;

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
  let userColor = Color(message.color);
  if (userColor.luminosity() < MINIMUM_LIGHTNESS) {
    userColor = userColor.lighten(MINIMUM_LIGHTNESS);
  }
  return (
    <div className={clsx("flex flex-col gap-1", isUsersFirstMessage && "mt-4")}>
      {isUsersFirstMessage && (
        <div className="self-start bg-backdrop px-2 py-1 rounded-lg flex items-center gap-1">
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
          <h6 className="text-xl" style={{ color: userColor.hex() }}>
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
  );
};

export default ChatMessage;
