import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MessageList from './MessageList';
import InputArea from './InputArea';
import Navbar from './Navbar';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);

    // Simulate bot response (replace with actual API call in a real application)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I'm an AI assistant. How can I help you?",
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900"
      >
        <MessageList messages={messages} />
        <InputArea onSendMessage={handleSendMessage} />
      </motion.div>
    </div>
  );
};

export default ChatInterface;

