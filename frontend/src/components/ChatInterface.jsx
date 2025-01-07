import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageList from './MessageList';
import InputArea from './InputArea';
import Navbar from './Navbar';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false)
  const messageListRef = useRef(null);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top:messageListRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = (text) => {
    setLoading(true)
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
      setLoading(false)
    }, 1000);
    
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col flex-1 overflow-hidden bg-primaryColorLight dark:bg-primaryColorDark"
      >
        <MessageList messages={messages} ref={messageListRef} />
        <InputArea loading={loading} onSendMessage={handleSendMessage} />
      </motion.div>
    </div>
  );
};

export default ChatInterface;

