import { useState, useEffect, useRef } from "react";
import { getResponseFromOpenAIApiCall } from "../../api-calls/openai.api";
import { getResponseFromGeminiApiCall } from "../../api-calls/gemini.api";

export const useChatInterface = () => {
  // States
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem("darkMode");
    return savedPreference ? JSON.parse(savedPreference) : false;
  });
  const [loading, setLoading] = useState(false);
  const modelOptions = [
    { value: "gemini-1.5-flash", label: "Gemini-1.5-Flash" },
    { value: "gpt-4o", label: "GPT-4o" },
  ];
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value);

  // Refs
  const messageListRef = useRef(null);

  // Handlers
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSendMessage = async (text) => {
    setLoading(true);
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "user",
    };
    setMessages([...messages, newMessage]);

    let response;
    if (selectedModel === "gemini-1.5-flash") {
      response = await getResponseFromGeminiApiCall({model: selectedModel, text});
    } else if (selectedModel === "gpt-4o") {
      response = await getResponseFromOpenAIApiCall({model: selectedModel, text});
    }

    let message;
    if (response.success) {
      message = response.message;
    } else {
      message = "I'm sorry, I couldn't process your request. Please try again.";
      console.error(response);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messages.length + 2,
        text: message,
        sender: "bot",
      },
    ]);
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return {
    messages,
    darkMode,
    toggleDarkMode,
    loading,
    messageListRef,
    handleSendMessage,
    selectedModel,
    setSelectedModel,
    modelOptions,
  };
};
