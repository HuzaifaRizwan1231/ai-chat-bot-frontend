import axios from "../../../config/axios.config"

const baseURL = '/api/chat'

export const getResponseFromChatApiCall = async (body)=>{
    try {
        const response = await axios.post(`${baseURL}/completion`, body)
        return response.data
    } catch (e) {
        return e
    }
}