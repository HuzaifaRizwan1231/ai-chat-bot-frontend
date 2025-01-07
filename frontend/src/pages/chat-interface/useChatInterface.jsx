import { useState, useEffect, useRef } from 'react';
import { getChatCompletionResponseApiCall } from '../../api-calls/chat.api';

export const useChatInterface = () => {
  // States
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference ? JSON.parse(savedPreference) : false;
  });
  const [loading, setLoading] = useState(false);

  // Refs
  const messageListRef = useRef(null);

  // Handlers
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  const handleSendMessage = async (text) => {
    setLoading(true);
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);

    const response = await getChatCompletionResponseApiCall();
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I'm an AI assistant. How can I help you?",
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setLoading(false);
    }, 1000);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Effects
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

  return {
    messages,
    darkMode,
    toggleDarkMode,
    loading,
    messageListRef,
    handleSendMessage,
  };
};