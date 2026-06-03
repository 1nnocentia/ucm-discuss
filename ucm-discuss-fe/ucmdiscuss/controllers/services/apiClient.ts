import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.ucm-discuss.app/v1', // Nanti ganti yah
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

