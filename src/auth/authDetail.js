import { jwtDecode } from "../helpers/jwtDecoder"

export const getAuthTokens = () => {
    return JSON.parse(localStorage.getItem('authTokens'))
}

export const addAuthTokens = (tokens) =>
    new Promise((resolve, reject) => {
        try {
            localStorage.setItem('authTokens', tokens)
            localStorage.setItem('userDetails', JSON.stringify(jwtDecode(JSON.parse(tokens).accessToken)))
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })

export const removeAuthTokens = () => {
    localStorage.removeItem('authTokens')
    localStorage.removeItem('userDetails')
}

export const updateAuthToken = (newAccessToken) => {
    localStorage.setItem('authTokens', {
        refreshToken: getAuthTokens.refreshToken,
        accessToken: newAccessToken
    })
}

export const getUserDetail = () => {
    return JSON.parse(localStorage.getItem('userDetails'))
}