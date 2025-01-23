import React, { useState } from "react";
import { motion } from "framer-motion";
import { MenuIcon, PlusIcon } from "@heroicons/react/solid";
import { format, differenceInDays } from "date-fns";

const Sidebar = ({
  chats,
  handleCreateNewChat,
  handleSelectChat,
  selectedChat,
  isCollapsed,
  toggleCollapse,
}) => {
  // Sort chats in descending order by date
  const sortedChats = [...chats].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const getLabel = (date) => {
    const diff = differenceInDays(new Date(), new Date(date));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return format(new Date(date), "MMMM dd, yyyy");
  };

  return (
    <motion.div
      className={`overflow-y-auto transition-width bg-sidebarColorLight dark:bg-sidebarColorDark shadow-md fixed top-0 left-0 z-10 h-full sm:static ${
        isCollapsed ? "w-0" : "w-full sm:w-80 "
      }`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={toggleCollapse}
              className="bg-primaryColorLight dark:bg-primaryColorDark text-black dark:text-white p-2 rounded-lg"
            >
              <MenuIcon className="h-5 w-5" />
            </button>

            <button
              onClick={handleCreateNewChat}
              className="bg-primaryColorLight dark:bg-primaryColorDark text-black dark:text-white p-2 rounded-lg"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2 text-sm">
            {sortedChats.map((chat, index) => {
              const showLabel =
                index === 0 ||
                getLabel(chat.created_at) !==
                  getLabel(sortedChats[index - 1].created_at);
              return (
                <React.Fragment key={chat.id}>
                  {showLabel && (
                    <div className="text-black text-nowrap dark:text-white font-semibold px-2">
                      {getLabel(chat.created_at)}
                    </div>
                  )}
                  <div
                    onClick={() => handleSelectChat(chat.id)}
                    className={`p-2 text-nowrap dark:text-white text-black ${
                      chat.id === selectedChat &&
                      "bg-primaryColorLight dark:bg-primaryColorDark"
                    } rounded-lg cursor-pointer hover:bg-primaryColorLight dark:hover:bg-primaryColorDark`}
                  >
                    {chat.id + " - " + chat.created_at}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </>
    </motion.div>
  );
};

export default Sidebar;
