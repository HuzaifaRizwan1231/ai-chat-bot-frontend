// Environment Variables

const API_URL = import.meta.env.VITE_API_URL;
const AES_SECRET_KEY = import.meta.env.VITE_AES_SECRET_KEY;
const AES_IV = import.meta.env.VITE_AES_IV;
const STREAM_ENABLED_MODELS = []; // Add comma separated model names with stream enabled to the array

export { API_URL, AES_SECRET_KEY, AES_IV, STREAM_ENABLED_MODELS };
