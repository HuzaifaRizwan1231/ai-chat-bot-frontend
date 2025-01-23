import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../../shared/Navbar";
import MessageList from "../components/MessageList";
import Sidebar from "../components/Sidebar";
import { useChatInterface } from "../hooks/useChatInterface";
import InputArea from "../components/InputArea";

const ChatInterface = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const {
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
  } = useChatInterface();

  return (
    <>
      <div className="flex h-screen">
        <Sidebar
          isCollapsed={isCollapsed}
          selectedChat={selectedChat}
          toggleCollapse={toggleCollapse}
          chats={chats}
          handleCreateNewChat={handleCreateNewChat}
          handleSelectChat={handleSelectChat}
        />
        <div
          className={`flex flex-col h-screen w-full ${darkMode ? "dark" : ""}`}
        >
          <Navbar
            isCollapsed={isCollapsed}
            toggleCollapse={toggleCollapse}
            handleCreateNewChat={handleCreateNewChat}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            modelOptions={modelOptions}
          />
          <div className="flex flex-1 overflow-hidden bg-primaryColorLight dark:bg-primaryColorDark">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <MessageList
                isCollapsed={isCollapsed}
                loading={loading}
                transcribing={transcribing}
                messages={messages}
                ref={messageListRef}
                selectedModel={selectedModel}
              />
              <InputArea
                isCollapsed={isCollapsed}
                handleAudioRecording={handleAudioRecording}
                recording={recording}
                loading={loading}
                onSendMessage={handleSendMessage}
                transcribing={transcribing}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
