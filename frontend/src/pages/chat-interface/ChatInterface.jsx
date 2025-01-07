import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import MessageList from '../../components/chat-interface/MessageList';
import { useChatInterface } from './useChatInterface';
import InputArea from '../../components/chat-interface/input-area/InputArea';


const ChatInterface = () => {
  const {
    messages,
    darkMode,
    toggleDarkMode,
    loading,
    messageListRef,
    handleSendMessage,
  } = useChatInterface();

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col flex-1 overflow-hidden bg-primaryColorLight dark:bg-primaryColorDark"
      >
        <MessageList loading={loading} messages={messages} ref={messageListRef} />
        <InputArea loading={loading} onSendMessage={handleSendMessage} />
      </motion.div>
    </div>
  );
};

export default ChatInterface;

