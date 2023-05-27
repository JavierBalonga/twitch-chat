import { Fragment, ReactNode } from "react";
import { Emotes } from "../../../types/Message";

export interface ParsedMessageContentProps {
  content: string;
  emotes: Emotes;
}

const MessageContent = ({ content, emotes }: ParsedMessageContentProps) => {
  const emotesArray: {
    id: string;
    start: number;
    end: number;
  }[] = [];

  Object.entries(emotes || {}).forEach(([id, rawPositions]) => {
    rawPositions.forEach((rawPosition) => {
      const [start, end] = rawPosition.split("-");
      emotesArray.push({
        id,
        start: Number(start),
        end: Number(end),
      });
    });
  });

  emotesArray.sort((a, b) => a.start - b.start);

  const parsedMessage: ReactNode[] = [];

  let currentPosition = 0;
  emotesArray.forEach(({ id, start, end }) => {
    parsedMessage.push(
      <span key={parsedMessage.length + 1}>
        {content.slice(currentPosition, start)}
      </span>
    );
    parsedMessage.push(
      <img
        key={parsedMessage.length + 1}
        className="h-[28px]"
        src={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/2.0`}
        alt={content.slice(start, end)}
      />
    );
    currentPosition = end + 1;
  });

  parsedMessage.push(content.slice(currentPosition));

  return (
    <p className="text-2xl flex flex-row wrap items-center gap-2">
      {parsedMessage}
    </p>
  );
};

export default MessageContent;
