import axios from 'axios';
import { AuthResponse } from "../interfaces/interfaces";

const API_URL = process.env.API_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/refresh`, { refreshToken: localStorage.getItem('refreshToken') }, { withCredentials: true })
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('NOT AUTHORIZED')
        }
    }
    throw error;
})

export default $api;
