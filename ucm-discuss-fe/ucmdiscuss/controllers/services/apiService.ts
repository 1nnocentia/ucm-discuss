import { ApiMock } from '@/constants/dummyData/apiMock';
import { apiClient } from '@/controllers/services/apiClient';
import { CreatePostInput, CreateCommentInput } from '@/models/user';

const USE_MOCK_DATA = true; 

export const ApiService = {
    // --- POSTS ---
    getPosts: async (page = 1) => {
        if (USE_MOCK_DATA) return ApiMock.getPosts(page);
        
        // Menggunakan axios: jauh lebih singkat dari fetch
        const response = await apiClient.get(`/posts?page=${page}`);
        return response.data; // Axios otomatis mem-parsing JSON ke dalam 'data'
    },

    getPostDetail: async (postId: string) => {
        if (USE_MOCK_DATA) return ApiMock.getPostDetail(postId);

        const response = await apiClient.get(`/posts/${postId}`);
        return response.data;
    },

    createPost: async (payload: CreatePostInput) => {
        if (USE_MOCK_DATA) return ApiMock.createPost(payload);

        const response = await apiClient.post('/posts', payload);
        return response.data;
    },

    // --- COMMENTS ---
    getComments: async (postId: string) => {
        if (USE_MOCK_DATA) return ApiMock.getComments(postId);

        const response = await apiClient.get(`/posts/${postId}/comments`);
        return response.data;
    },

    createComment: async (payload: CreateCommentInput) => {
        if (USE_MOCK_DATA) return ApiMock.createComment(payload);

        const response = await apiClient.post('/comments', payload);
        return response.data;
    },

    // --- TOPICS & NOTIFICATIONS ---
    getTopics: async () => {
        if (USE_MOCK_DATA) return ApiMock.getTopics();

        const response = await apiClient.get('/topics');
        return response.data;
    },

    getNotifications: async () => {
        if (USE_MOCK_DATA) return ApiMock.getNotifications();

        const response = await apiClient.get('/notifications');
        return response.data;
    }
};