import clsx from "clsx";
import { Message } from "../../types/Message";
import MessageContent from "./MessageContent";
import Color from "color";

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
  const userColor = Color(message.color);

  // TODO averiguar porque el color #000000 no se le aumenta el brillo
  console.log({
    color: message.color,
    resultColor:
      userColor.luminosity() < MINIMUM_LIGHTNESS
        ? userColor.lighten(MINIMUM_LIGHTNESS).hex()
        : userColor.hex(),
  });

  return (
    <div className={clsx("flex flex-col gap-1", isUsersFirstMessage && "mt-4")}>
      {isUsersFirstMessage && (
        <div className="self-start bg-background/90 px-2 py-1 rounded-lg">
          <h6
            className="text-xl"
            style={{
              color:
                userColor.luminosity() < MINIMUM_LIGHTNESS
                  ? userColor.lighten(MINIMUM_LIGHTNESS).hex()
                  : userColor.hex(),
            }}
          >
            {message.displayName || message.username}
          </h6>
        </div>
      )}
      <div
        className={clsx(
          "px-6 bg-background text-primary",
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
