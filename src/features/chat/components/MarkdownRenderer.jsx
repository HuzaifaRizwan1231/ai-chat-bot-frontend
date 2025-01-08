import React from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { solarizedDarkAtom, solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ message, classStyles }) => {

  const isDarkMode = localStorage.getItem("darkMode") === "true";

  return (
    <>
      <ReactMarkdown
        className={classStyles}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={isDarkMode ? solarizedDarkAtom : solarizedlight}
                language={match[1]}
                PreTag="div"
                wrapLongLines={true}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className={`bg-yellow-100 dark:bg-[#424242] p-1 rounded ${className}`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {message.text}
      </ReactMarkdown>
    </>
  );
};

export default MarkdownRenderer;
