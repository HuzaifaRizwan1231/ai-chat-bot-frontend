import axios from "../config/axios.config"

const baseURL = '/api/chat'

export const getChatCompletionResponseApiCall = async ()=>{
    try {
        const response = await axios.get(`${baseURL}/completion`)
        return response.data
    } catch (e) {
        return e
    }
}