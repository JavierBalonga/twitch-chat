import useTwitchMessages from "./useTwitchClient";
import ChatMessage from "../ChatMessage";

const Chat = () => {
  const messages = useTwitchMessages();

  return (
    <div className="container mx-auto max-w-md grow flex flex-col gap-4 justify-end">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Chat;
