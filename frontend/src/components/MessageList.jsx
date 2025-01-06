import React from 'react';
import { motion } from 'framer-motion';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
  return (
    <motion.div
      className="flex-1 overflow-y-auto p-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </motion.div>
  );
};

export default MessageList;

