import { useEffect } from "react";
import useMessagesStore from "../../contexts/messagesStore";
import tmi from "tmi.js";
import randomColor from "../../utils/randomColor";

const { VITE_ENABLE_DEBUG } = import.meta.env;

const TIME_OF_PERSISTENCE = 60000;

const useTwitchMessages = () => {
  const messages = useMessagesStore((state) => state.messages);
  const addMessage = useMessagesStore((state) => state.addMessage);
  const removeMessage = useMessagesStore((state) => state.removeMessage);

  useEffect(() => {
    const twitchClient = new tmi.Client({
      options: { debug: VITE_ENABLE_DEBUG === "true" },
      channels: ["metalit0"],
    });

    twitchClient.connect().catch(console.error);

    twitchClient.on("message", (_channel, tags, message, self) => {
      const { id, username, "display-name": displayName, color, emotes } = tags;
      if (self || !id || !username) return;

      addMessage({
        id,
        displayName,
        username,
        color: color || randomColor(username),
        emotes: emotes || {},
        content: message,
      });

      setTimeout(() => {
        removeMessage(id);
      }, TIME_OF_PERSISTENCE);
    });

    return () => {
      twitchClient.disconnect().catch(console.error);
    };
  }, []);

  return messages;
};

export default useTwitchMessages;
