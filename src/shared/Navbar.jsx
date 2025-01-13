import React, { useState } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const Navbar = ({
  darkMode,
  toggleDarkMode,
  selectedModel,
  setSelectedModel,
  modelOptions,
}) => {
  return (
    <nav className="bg-primaryColorLight dark:bg-primaryColorDark shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:flex-row justify-between py-4">
          <div className="items-center text-center sm:text-left sm:justify-start justify-center w-full sm:w-1/3 mb-2 sm:mb-0">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              AI Chatbot
            </span>
          </div>
          <div className="flex items-center w-full sm:w-2/3">
            <div className="flex w-1/2 justify-start sm:justify-center">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="p-2 rounded bg-secondaryColorLight dark:bg-secondaryColorDark text-gray-800 dark:text-white w-full sm:w-auto"
              >
                {modelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-1/2 justify-end ">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-secondaryColorLight dark:bg-secondaryColorDark text-gray-800 dark:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
