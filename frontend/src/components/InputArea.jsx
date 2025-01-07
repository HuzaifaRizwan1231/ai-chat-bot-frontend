import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/solid";

const InputArea = ({ onSendMessage, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <motion.div
      className=" dark:bg-secondaryColorDark bg-secondaryColorLight p-4 my-4 shadow-md w-1/2 mx-auto rounded-3xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) =>{
             setInput(e.target.value)
            }}
          placeholder="Message AI Chatbot"
          className="flex-1 rounded-lg focus:outline-none dark:bg-secondaryColorDark  dark:text-white bg-secondaryColorLight text-black"
        />
        <motion.button
          disabled={loading}
          type="submit"
          className={`px-4 py-2 h-8 w-8 flex items-center justify-center ${loading || input.length == 0 ? "dark:bg-[#676767]  dark:text-[#2f2f2f] bg-[#d7d7d7] text-[#f4f4f4]": "dark:bg-white bg-black dark:text-black text-white dark:hover:bg-slate-300"}  rounded-full  focus:outline-none`}
        >
          <div>
            <ArrowUpIcon className="w-5 h-5" />
          </div>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default InputArea;
