import { Fragment } from "react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import { useEmotesContext } from "../EmotesContext";

const TextComponent = ({ children }: ReactMarkdownProps) => {
  const emotesDictionary = useEmotesContext();

  return (
    <p className="text-2xl">
      {children.map((child, i) => {
        if (typeof child !== "string") return child;
        return (
          <Fragment key={i}>
            {child.split(" ").map((word, i) => {
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
          </Fragment>
        );
      })}
    </p>
  );
};

export default TextComponent;
