import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../../shared/Navbar";
import MessageList from "../components/MessageList";
import {useChatInterface} from "../hooks/useChatInterface";

import InputArea from "../components/InputArea";

const ChatInterface = () => {
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
    transcribing
  } = useChatInterface();

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        modelOptions={modelOptions}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col flex-1 overflow-hidden bg-primaryColorLight dark:bg-primaryColorDark"
      >
        <MessageList
          loading={loading}
          transcribing={transcribing}
          messages={messages}
          ref={messageListRef}
          selectedModel={selectedModel}
        />
        <InputArea handleAudioRecording={handleAudioRecording} recording={recording} loading={loading} onSendMessage={handleSendMessage} transcribing={transcribing} />
      </motion.div>
    </div>
  );
};

export default ChatInterface;
