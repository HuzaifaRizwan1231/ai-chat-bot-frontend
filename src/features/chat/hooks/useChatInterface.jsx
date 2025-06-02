import { useState, useEffect, useRef } from "react";
import {
  getResponseFromChatApiCall,
  trancribeAudioApiCall,
} from "../api/chat.api";

export const useChatInterface = () => {
  // States
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem("darkMode");
    return savedPreference ? JSON.parse(savedPreference) : false;
  });
  const [loading, setLoading] = useState(false);
  const modelOptions = [
    { value: "gpt-4o", label: "GPT-4o" },
    {
      value: "ft:gpt-4o-mini-2024-07-18:mergestack::AqhhvrOU",
      label: "OpenAI Fine Tuned",
    },
    { value: "gemini-1.5-flash", label: "Gemini-1.5-Flash" },
    { value: "tunedModels/increment-vgmge91wh5dn", label: "Gemini Fine Tuned" },
    { value: "mergestack-chat-assistant", label: "Mergestack-Assisant" },
    { value: "claude-3-5-sonnet-20241022", label: "Claude-Sonnet-3.5" },
  ];
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);

  // Refs
  const messageListRef = useRef(null);
  const mediaRecorderRef = useRef(null);

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

    const response = await getResponseFromChatApiCall({
      model: selectedModel,
      text,
    });

    let message;
    if (response.success) {
      message = response.data;
    } else {
      message = "I'm sorry, I couldn't process your request. Please try again.";
      console.error(response);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messages.length + 2,
        text: message,
        sender: selectedModel,
      },
    ]);
    setLoading(false);
  };

  const handleAudioRecording = () => {
    if (recording) {
      setTranscribing(true);
      mediaRecorderRef.current.stop();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleAudioData;
        mediaRecorderRef.current.start();
      });
    }
    setRecording(!recording);
  };

  const handleAudioData = (event) => {
    const audioBlob = event.data;
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");
    sendAudio(formData);
  };

  const sendAudio = async (formData) => {
    setTranscribing(true);
    const response = await trancribeAudioApiCall(formData);
    if (response.success) {
      setTranscribing(false);
      handleSendMessage(response.data);
    } else {
      console.error(response);
    }
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
    handleAudioRecording,
    recording,
    transcribing,
  };
};
