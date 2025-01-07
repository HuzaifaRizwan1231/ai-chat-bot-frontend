import React from "react";
import { motion } from "framer-motion";
import ChatBotIcon from "../icons/ChatBotIcon";

const MessageItem = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isUser ? (
        <>
          <div
            className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl px-4 py-2 bg-secondaryColorLight dark:bg-secondaryColorDark text-black dark:text-white"
          >
            <p className="text-base ">{message.text}</p>
          </div>
        </>
      ) : (
        <><div
        className="max-w-xs flex items-center gap-4 md:max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl px-4 py-2 text-gray-800 dark:text-white"
      >
        <ChatBotIcon/>
        <p className="text-base ">{message.text}</p>
      </div></>
      )}
    </motion.div>
  );
};

export default MessageItem;
