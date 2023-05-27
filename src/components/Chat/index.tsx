import useTwitchMessages from "./useTwitchClient";
import ChatMessage from "../ChatMessage";

const Chat = () => {
  const messages = useTwitchMessages();

  return (
    <article className="container mx-auto max-w-md grow flex flex-col justify-end">
      {messages.map((message, i) => {
        const previousMessage = messages[i - 1];
        const nextMessage = messages[i + 1];
        const isUsersFirstMessage =
          previousMessage?.username !== message.username;
        const isUsersLastMessage = nextMessage?.username !== message.username;
        return (
          <ChatMessage
            key={message.id}
            message={message}
            isUsersFirstMessage={isUsersFirstMessage}
            isUsersLastMessage={isUsersLastMessage}
          />
        );
      })}
    </article>
  );
};

export default Chat;
