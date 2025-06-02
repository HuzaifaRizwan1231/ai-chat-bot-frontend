import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import MessageItem from "./MessageItem";
import MessageItemSkeleton from "./skeletons/MessageItemSkeleton";

const MessageList = forwardRef(({ loading, messages, selectedModel }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="flex-1 overflow-y-auto pt-4 pb-8 space-y-4 px-4 sm:px-8 md:px-[7rem] lg:px-[16rem] xl:px-[21rem]"
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
          <MessageItem
            selectedModel={selectedModel}
            key={message.id}
            message={message}
          />
        ))
      )}

      {/* Skeleton loader indicating response generation */}
      {loading && (
          <MessageItemSkeleton  selectedModel={selectedModel}/>
      )}
    </motion.div>
  );
});

export default MessageList;
