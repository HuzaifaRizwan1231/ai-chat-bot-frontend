import axios from "../../../config/axios.config";
import { API_URL } from "../../../config/constants.config";
import { decryptData, encryptData } from "../../../utils/cypto.utils";

const baseURL = "/api/chat";

export const getResponseFromChatApiCall = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/completion`, {
      model: body.model,
      text: encryptData(body.text),
    });
    response.data.data &&
      (response.data.data = decryptData(response.data.data));
    return response.data;
  } catch (e) {
    return e;
  }
};

export const getResponseFromLangchainChatApiCall = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/langchain-completion`, {
      model: body.model,
      text: encryptData(body.text),
      chatId: body.chatId,
    });
    response.data.data &&
      (response.data.data = decryptData(response.data.data));
    return response.data;
  } catch (e) {
    return e;
  }
};

export const trancribeAudioApiCall = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/transcribe`, formData);
    response.data.data &&
      (response.data.data = decryptData(response.data.data));
    return response.data;
  } catch (e) {
    return e;
  }
};

export const eventSourceApiCall = async (body) => {
  try {
    return new EventSource(
      `${API_URL}${baseURL}/stream?text=${encodeURIComponent(
        body.text
      )}&model=${body.model}`
    );
  } catch (e) {
    console.error(e);
  }
};

export const createNewChatApiCall = async () => {
  try {
    const response = await axios.post(`${baseURL}/create`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const getAllChatsApiCall = async () => {
  try {
    const response = await axios.get(`${baseURL}/get`);
    return response.data;
  } catch (e) {
    return e;
  }
};
