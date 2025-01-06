import React from 'react';
import { motion } from 'framer-motion';

const MessageItem = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </motion.div>
  );
};

export default MessageItem;

