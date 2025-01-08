import React from "react";
import { motion } from "framer-motion";
import ChatBotIcon from "./icons/ChatBotIcon";
import MarkdownRenderer from "./MarkdownRenderer";

const MessageItem = ({ message }) => {
  const isUser = message.sender === "user";

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
            <MarkdownRenderer message={message} classStyles={"text-base leading-loose"} />
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex gap-4 rounded-3xl px-4 py-2 text-gray-800 dark:text-white">
            <div className="w-[24px] h-[24px]">
              <ChatBotIcon model={message.sender} />
            </div>
            <MarkdownRenderer message={message} classStyles={"text-base leading-loose w-full overflow-x-auto"} />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default MessageItem;
