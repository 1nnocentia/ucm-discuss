import { ApiMock } from '@/constants/dummyData/apiMock';
import { apiClient } from '@/controllers/services/apiClient';
import { CreatePostInput, CreateCommentInput } from '@/models/user';

const USE_MOCK_DATA = true; 

export const ApiService = {
    // Post
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

    // Comments
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

    // Votes
    votePost: async (postId: string, isVoted: boolean) => {
        if (USE_MOCK_DATA) return ApiMock.votePost?.(postId, isVoted) || { success: true, isVoted };
        const response = await apiClient.post(`/posts/${postId}/vote`, { isVoted });
        return response.data;
    },

    voteComment: async (commentId: string, isVoted: boolean) => {
        if (USE_MOCK_DATA) return ApiMock.voteComment?.(commentId, isVoted) || { success: true, isVoted };

        const response = await apiClient.post(`/comments/${commentId}/vote`, { isVoted });
        return response.data;
    },

    // Topics
    getTopics: async () => {
        if (USE_MOCK_DATA) return ApiMock.getTopics();

        const response = await apiClient.get('/topics');
        return response.data;
    },

    getTopicStats: async (topicId: string) => {
        if (USE_MOCK_DATA) return ApiMock.getTopicStats?.(topicId) || { discussionCount: 0 };
        const response = await apiClient.get(`/topics/${topicId}/stats`);
        return response.data;
    },

    // Notifications
    getNotifications: async () => {
        if (USE_MOCK_DATA) return ApiMock.getNotifications();

        const response = await apiClient.get('/notifications');
        return response.data;
    },

    // Auth
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

    // Search
    search: async (query: string) => {
        if (USE_MOCK_DATA) return ApiMock.search?.(query) || { posts: [], comments: [] };

        const response = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
        return response.data;
    }
};