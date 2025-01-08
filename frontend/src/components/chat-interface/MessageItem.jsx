import React from "react";
import { motion } from "framer-motion";
import ChatBotIcon from "../icons/ChatBotIcon";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom, solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";


const MessageItem = ({ message, selectedModel }) => {
  const isUser = message.sender === "user";
  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isUser ? (
        <>
          <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl px-4 py-2 bg-secondaryColorLight dark:bg-secondaryColorDark text-black dark:text-white">
            <ReactMarkdown
              className="text-base"
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={isDarkMode ? solarizedDarkAtom : solarizedlight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={`bg-yellow-100 dark:bg-yellow-900 p-1 rounded ${className}`}
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
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex gap-4 rounded-3xl px-4 py-2 text-gray-800 dark:text-white">
            <div className="w-[24px] h-[24px]">
              <ChatBotIcon selectedModel={selectedModel}/>
            </div>
            <ReactMarkdown
              className="text-base"
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={isDarkMode ? solarizedDarkAtom : solarizedlight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={`bg-yellow-100 dark:bg-yellow-900 p-1 rounded ${className}`}
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
          </div>
        </>
      )}
    </motion.div>
  );
};

export default MessageItem;
