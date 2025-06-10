// Environment Variables

const API_URL = import.meta.env.VITE_API_URL;
const AES_SECRET_KEY = import.meta.env.VITE_AES_SECRET_KEY;
const AES_IV = import.meta.env.VITE_AES_IV;

// Feature Toggles
const STREAM_ENABLED_MODELS = ["gpt-4o"]; // Add comma separated model names with stream enabled to the array
const USE_STREAMING = false; // if true then stream enabled models will be used
const USE_LANGCHAIN = true; // if true then models will hit the langchain API instead of the chat API
const ENABLE_GPT = false;
const ENABLE_FINE_TUNED_GPT = false;
const ENABLE_GEMINI = true;
const ENABLE_FINE_TUNED_GEMINI = false;
const ENABLE_MERGESTACK_ASSISTANT = false;
const ENABLE_CLAUDE = false;

export {
  API_URL,
  AES_SECRET_KEY,
  AES_IV,
  STREAM_ENABLED_MODELS,
  USE_LANGCHAIN,
  USE_STREAMING,
  ENABLE_GPT,
  ENABLE_FINE_TUNED_GPT,
  ENABLE_GEMINI,
  ENABLE_FINE_TUNED_GEMINI,
  ENABLE_MERGESTACK_ASSISTANT,
  ENABLE_CLAUDE,
};
