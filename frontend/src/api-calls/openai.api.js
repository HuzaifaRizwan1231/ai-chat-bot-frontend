import axios from "../config/axios.config"

const baseURL = '/api/openai/chat'

export const getResponseFromOpenAIApiCall = async (body)=>{
    try {
        const response = await axios.post(`${baseURL}/completion`, body)
        return response.data
    } catch (e) {
        return e
    }
}