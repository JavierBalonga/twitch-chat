import { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

const codeStyle = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    fontSize: "inherit",
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    fontSize: "inherit",
  },
};

const CodeComponent: Components["code"] = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const code = String(children);
  const match = /^\w+\s/.exec(code);
  const languaje = match && match[0].trim();
  return languaje ? (
    <SyntaxHighlighter
      {...props}
      children={prettier.format(code.slice(languaje.length + 1), {
        parser: "babel",
        plugins: [parserBabel],
        printWidth: 30,
      })}
      style={{ ...codeStyle }}
      language={languaje}
      PreTag="div"
    />
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  );
};

export default CodeComponent;
