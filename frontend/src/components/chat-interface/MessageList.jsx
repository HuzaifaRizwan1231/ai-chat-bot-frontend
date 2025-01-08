import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import MessageItem from "./MessageItem";
import ChatBotIcon from "../icons/ChatBotIcon";

const MessageList = forwardRef(({ loading, messages, selectedModel }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="flex-1 overflow-y-auto p-4 space-y-4 px-[21rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500 dark:text-gray-400">
          <h2 className="text-2xl font-bold mb-2">Welcome to AI Chatbot!</h2>
          <p className="text-lg">
            Start a conversation by typing a message below.
          </p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem selectedModel={selectedModel} key={message.id} message={message} />
        ))
      )}

      {/* Skeleton loader indicating response generation */}
      {loading && (
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="ps-4 text-black dark:text-white flex gap-4">
          <div className="w-[24px]">
          <ChatBotIcon selectedModel={selectedModel}/>
          </div>
          <div className="animate-pulse flex flex-col gap-2 w-full">
            <div className="h-6 bg-secondaryColorLight dark:bg-secondaryColorDark rounded w-3/4"></div>
            <div className="h-6 bg-secondaryColorLight dark:bg-secondaryColorDark rounded w-5/6"></div>
            <div className="h-6 bg-secondaryColorLight dark:bg-secondaryColorDark rounded w-2/3"></div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

export default MessageList;
