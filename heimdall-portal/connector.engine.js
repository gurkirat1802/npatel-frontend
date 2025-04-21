import axios from "axios";
import { getAuthTokens } from "../src/auth/authDetail";

const apiEndpoint = import.meta.env.VITE_REACT_APP_API_ENDPOINT

export const postCall = async (apiRoute, payload) => {
    try {
        return (await axios.post( apiEndpoint + apiRoute, payload )).data
    } catch (error) {
        return error.response.data
    }
}

export const deleteCall = async (apiRoute) => {
    try {
        return (await axios.delete( apiEndpoint + apiRoute )).data
    } catch (error) {
        return error.response.data
    }
}

export const postCallSecured = async ( apiRoute, payload ) => {
    const config = {
        headers: { Authorization: `Bearer ${getAuthTokens().accessToken}`}
    }
    try {
        return (await axios.post( apiEndpoint + apiRoute, payload, config )).data
    } catch (error) {
        console.log(error)
        if(error?.response?.data?.code == 1401){
            window.location.href = '/auth'
        }
        return error.response.data
    }
}