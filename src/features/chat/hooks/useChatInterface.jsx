import { useState, useEffect, useRef } from "react";
import {
  createNewChatApiCall,
  deleteChatApiCall,
  eventSourceApiCall,
  getAllChatsApiCall,
  getResponseFromChatApiCall,
  getResponseFromLangchainChatApiCall,
  trancribeAudioApiCall,
  updateChatApiCall,
} from "../api/chat.api";
import { encryptData } from "../../../utils/cypto.utils";
import {
  STREAM_ENABLED_MODELS,
  USE_LANGCHAIN,
  USE_STREAMING,
} from "../../../config/constants.config";
import {
  getMessagesOfChatApiCall,
  insertMessageApiCall,
} from "../api/message.api";

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
  const [chatLoading, setChatLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Refs
  const messageListRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const lastMessageRef = useRef(null);

  // Handlers
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const setSelectedChatInLocalStorage = (chat) => {
    localStorage.setItem("selectedChat", JSON.stringify(chat));
  };

  const handleChatStream = async (text) => {
    const eventSource = await eventSourceApiCall({
      text,
      model: selectedModel,
    });

    eventSource.onmessage = (event) => {
      // Set false after a chunk is recieved for stream enabled models
      setLoading(false);

      const data = JSON.parse(event.data);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];

        // Check if lastMessage is from assistant and avoid appending duplicate content
        if (lastMessage && lastMessage.sender !== "user") {
          lastMessage.text += data.text;
        } else {
          updatedMessages.push({
            id: prevMessages.length + 1,
            text: data.text,
            sender: selectedModel,
          });
        }

        return updatedMessages;
      });
    };

    eventSource.onerror = (error) => {
      console.log("Error occurred:", error);
      eventSource.close();
    };
  };

  const handleSendMessage = async (text) => {
    setLoading(true);
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    insertMessage(newMessage);

    if (USE_STREAMING && STREAM_ENABLED_MODELS.includes(selectedModel)) {
      // Handle models with stream enabled
      await handleChatStream(text);
    } else {
      // Handle models without stream enabled
      let message, response;
      USE_LANGCHAIN
        ? (response = await getResponseFromLangchainChatApiCall({
            model: selectedModel,
            text,
            chatId: selectedChat.id,
          }))
        : (response = await getResponseFromChatApiCall({
            model: selectedModel,
            text,
          }));

      if (response.success) {
        message = response.data;
      } else {
        message =
          "I'm sorry, I couldn't process your request. Please try again.";
        console.error(response);
      }
      const newMessage = {
        id: messages.length + 2,
        text: message,
        sender: selectedModel,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      insertMessage(newMessage);

      // Set false after response is recieved for normal chat
      setLoading(false);
    }
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

  const handleCreateNewChat = async () => {
    const response = await createNewChatApiCall();
    if (response.success) {
      setChats((prevChats) => [...prevChats, response.data]);
      setSelectedChat(response.data);
      setSelectedChatInLocalStorage(response.data);
      setMessages([]);
    } else {
      console.error(response);
    }
  };

  const handleSelectChat = async (chat) => {
    // Do nothing if chat has no messages, hence no title
    if (!chat.title) return;
    // Do nothing if same chat is selected again
    if (selectedChat && chat.id === selectedChat.id) return;
    setChatLoading(true);
    setSelectedChat(chat);
    setSelectedChatInLocalStorage(chat);

    // Fetch messages of the chat
    const response = await getMessagesOfChatApiCall(chat.id);
    if (response.success) {
      setMessages(response.data);
    } else {
      console.error(response);
    }
    setChatLoading(false);
  };

  const setChatTitle = async (chat) => {
    const firstMessage = messages[0];
    const prompt = `Based on the following message you have to suggest a title to name the chat / conversation. Provide only one concise title without any quotation marks nothing more nothing less, only plain text:

"${firstMessage.text}"`;

    // Getting a title from the model
    const response = await getResponseFromChatApiCall({
      model: "gpt-4o",
      text: prompt,
    });

    if (response.success) {
      const title = response.data;
      const updatedChat = { ...chat, title };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === updatedChat.id ? updatedChat : chat
        )
      );

      // updating the title in the database
      const res = await updateChatApiCall({
        chatId: chat.id,
        title: title,
      });

      if (!res.success) {
        console.error(res);
      }
    } else {
      console.error(response);
    }
  };

  const handleDeleteChat = async (chatId) => {
    const response = await deleteChatApiCall(chatId);
    if (response.success) {
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
        setSelectedChatInLocalStorage(null);
        setMessages([]);
      }
    } else {
      console.error(response);
    }
  };

  const getAllChats = async () => {
    const response = await getAllChatsApiCall();
    if (response.success) {
      setChats(response.data);
    } else {
      console.error(response);
    }
  };

  const insertMessage = async (message) => {
    const response = await insertMessageApiCall({
      text: message.text,
      sender: message.sender,
      chatId: selectedChat.id,
    });
    if (!response.success) {
      console.error(response);
    }
  };

  useEffect(() => {
    getAllChats();
    const selectedChat = JSON.parse(localStorage.getItem("selectedChat"));
    handleSelectChat(selectedChat);
  }, []);

  // Effects
  useEffect(() => {
    scrollToBottom();
    // If there is a first message for the chat and still title is not set, set the title
    if (selectedChat && messages.length === 1 && !selectedChat.title)
      setChatTitle(selectedChat);
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
    chats,
    handleCreateNewChat,
    handleSelectChat,
    selectedChat,
    handleDeleteChat,
    chatLoading,
    setChatLoading,
  };
};
