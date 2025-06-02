import axios from "../../../config/axios.config";
import { decryptData, encryptData } from "../../../utils/cypto.utils";

const baseURL = "/api/chat";

export const getResponseFromChatApiCall = async (body) => {
  try {
    const response = await axios.post(`${baseURL}/completion`, {
      model: body.model,
      text: encryptData(body.text),
    });
    response.data.data = decryptData(response.data.data);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const trancribeAudioApiCall = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/transcribe`, formData);
    response.data.data = decryptData(response.data.data);
    return response.data;
  } catch (e) {
    return e;
  }
};
