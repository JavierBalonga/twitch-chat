import { Message } from "../../types/Message";
import MessageContent from "./MessageContent";

export interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="rounded-lg p-3 bg-slate-50">
      <h6 className="text-xl" style={{ color: message.color }}>
        {message.displayName || message.username}
      </h6>
      <MessageContent content={message.content} emotes={message.emotes} />
    </div>
  );
};

export default ChatMessage;
