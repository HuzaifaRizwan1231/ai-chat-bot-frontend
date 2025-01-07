import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/solid";

const InputArea = ({ onSendMessage, loading }) => {
  const [input, setInput] = useState("");
  const [rows, setRows] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
      setRows(1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading){
        handleSubmit(e);
      }
    }
  }

  const handleInputChange = (e) => {

    const allowedRows = 6;
    const textareaLineHeight = 24; 
    const previousRows = e.target.rows;
    e.target.rows = 1; 

    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= allowedRows) {
      e.target.rows = allowedRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < allowedRows ? currentRows : allowedRows);
    setInput(e.target.value);
  };

  return (
    <motion.div
      className=" dark:bg-secondaryColorDark bg-secondaryColorLight p-4 my-4 shadow-md w-1/2 mx-auto rounded-3xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <textarea
        onKeyDown={handleKeyDown}
          value={input}
          onChange={handleInputChange}
          placeholder="Message AI Chatbot"
          className="flex-1 rounded-lg focus:outline-none dark:bg-secondaryColorDark  dark:text-white bg-secondaryColorLight text-black resize-none"
            rows={rows}
        />
        <motion.button
          disabled={loading}
          type="submit"
          className={`px-4 py-2 h-8 w-8 flex items-center justify-center mt-auto ${loading || input.length == 0 ? "dark:bg-[#676767]  dark:text-[#2f2f2f] bg-[#d7d7d7] text-[#f4f4f4]": "dark:bg-white bg-black dark:text-black text-white dark:hover:bg-slate-300"}  rounded-full  focus:outline-none`}
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
