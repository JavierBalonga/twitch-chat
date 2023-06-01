import ReactMarkdown from "react-markdown";
import TextComponent from "./TextComponent";
import { EmotesContextProvider } from "./EmotesContext";
import ImgComponent from "./ImgComponent";
import CodeComponent from "./CodeComponent";
import { Emotes } from "../../../contexts/TwitchResourcesProvider/messagesStore";

export interface ParsedMessageContentProps {
  content: string;
  emotes: Emotes;
}

const MessageContent = ({ content, emotes }: ParsedMessageContentProps) => {
  return (
    <EmotesContextProvider emotes={emotes} content={content}>
      <div className="text-2xl">
        <ReactMarkdown
          components={{
            h1: TextComponent,
            h2: TextComponent,
            h3: TextComponent,
            h4: TextComponent,
            h5: TextComponent,
            h6: TextComponent,
            p: TextComponent,
            img: ImgComponent,
            code: CodeComponent,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </EmotesContextProvider>
  );
};

export default MessageContent;
