import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import MessageItem from './MessageItem';

const MessageList =forwardRef(({ messages }, ref) => {
  return (
    <motion.div
    ref={ref}
      className="flex-1 overflow-y-auto p-4 space-y-4 px-[21rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    {messages.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <h2 className="text-2xl font-bold mb-2">Welcome to AI Chatbot!</h2>
          <p className="text-lg">Start a conversation by typing a message below.</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))
      )}
    </motion.div>
  );
});

export default MessageList;

