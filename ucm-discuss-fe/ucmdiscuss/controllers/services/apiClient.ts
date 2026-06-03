import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('authToken'); 
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn("Token is null or invalid.");
            } else if (error.response.status === 500) {
                console.warn("Server encountered an internal error.");
            }
        } else if (error.request) {
            console.warn("No response received from server. Possible network error.");
        }
        return Promise.reject(error);
    }
);