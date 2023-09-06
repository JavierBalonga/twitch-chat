import { Emotes } from "../../../contexts/TwitchResourcesProvider/messagesStore";
import { Fragment, useMemo } from "react";

export type EmotesDictionary = {
  [name: string]: string | undefined;
};

export interface ParsedMessageContentProps {
  content: string;
  emotes: Emotes;
}

const MessageContent = ({ content, emotes }: ParsedMessageContentProps) => {
  const emotesDictionary = useMemo(() => {
    const emotesDictionary: EmotesDictionary = {};

    Object.entries(emotes).forEach(([id, rawPositions]) => {
      const [start, end] = rawPositions[0].split("-");
      const name = content.slice(Number(start), Number(end) + 1);
      emotesDictionary[name] = id;
    });

    return emotesDictionary;
  }, [emotes, content]);

  return (
    <div className="text-2xl">
      {content.split(" ").map((word, i) => {
        const emoteId = emotesDictionary[word];
        if (emoteId) {
          return (
            <img
              key={i}
              className="inline h-[28px]"
              src={`https://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/2.0`}
              alt={word}
            />
          );
        }
        return <Fragment key={i}> {word} </Fragment>;
      })}
    </div>
  );
};

export default MessageContent;
