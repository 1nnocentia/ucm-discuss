import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
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