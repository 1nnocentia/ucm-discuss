import { ApiMock } from '@/constants/dummyData/apiMock';
import { apiClient } from '@/controllers/services/apiClient';
import { CreatePostInput, CreateCommentInput } from '@/models/user';

const USE_MOCK_DATA = true; 

export const ApiService = {
    // --- POSTS ---
    getPosts: async (page = 1) => {
        if (USE_MOCK_DATA) return ApiMock.getPosts(page);
        
        const response = await apiClient.get(`/posts?page=${page}`);
        return response.data; 
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

    getUserPosts: async (userId: string) => {
        if (USE_MOCK_DATA) return ApiMock.getUserPosts?.(userId) || [];

        const response = await apiClient.get(`/users/${userId}/posts`);
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

    getUserComment: async (userId: string) => {
        if (USE_MOCK_DATA) return ApiMock.getUserComments?.(userId) || [];
        
        const response = await apiClient.get(`/users/${userId}/comments`);
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
    },

    // --- AUTHENTICATION ---
    login: async (email: string, isStudent: boolean, nim: string, name: string, token: string) => {
        if (USE_MOCK_DATA) return ApiMock.login?.(email, isStudent, nim, name) || { token: 'mock-token', user: { id: '1', email, name: 'Mock User', nim: '12345', isStudent: true } };

        const response = await apiClient.post('/auth/login', { email });
        return response.data;
    },

    logout: async () => {
        if (USE_MOCK_DATA) return { success: true };

        const response = await apiClient.post('/auth/logout', {});
        return response.data;
    },

    // --- SEARCH ---
    search: async (query: string) => {
        if (USE_MOCK_DATA) return ApiMock.search?.(query) || { posts: [], comments: [] };

        const response = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
        return response.data;
    }
};