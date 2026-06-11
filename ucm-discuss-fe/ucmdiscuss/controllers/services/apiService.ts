import { ApiMock } from '@/constants/dummyData/apiMock';
import { apiClient } from '@/controllers/services/apiClient';
import { CreatePostInput, CreateCommentInput, ProfileCardData, UserHistory, TopicsData } from '@/models/user';

const USE_MOCK_DATA = false; 

const buildImagePart = (imageUri?: string | null) => {
    if (!imageUri) {
        return null;
    }

    const fileName = imageUri.split('/').pop() || `image-${Date.now()}.jpg`;
    const fileExtension = fileName.includes('.') ? fileName.split('.').pop()?.toLowerCase() : 'jpg';
    const mimeType = fileExtension === 'png'
        ? 'image/png'
        : fileExtension === 'webp'
            ? 'image/webp'
            : 'image/jpeg';

    return {
        uri: imageUri,
        name: fileName,
        type: mimeType,
    } as any;
};

const appendJsonField = (formData: FormData, key: string, value?: unknown) => {
    if (value === undefined || value === null) {
        return;
    }

    formData.append(key, JSON.stringify(value));
};

const toMultipartPostFormData = (payload: CreatePostInput) => {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('description', payload.description ?? '');
    formData.append('topicId', payload.topicId);
    formData.append('isAnonymous', String(payload.isAnonymous));

    appendJsonField(formData, 'aiInteraction', payload.aiInteraction);

    const imagePart = buildImagePart(payload.image ?? null);
    if (imagePart) {
        formData.append('image', imagePart);
    }

    return formData;
};

const toMultipartCommentFormData = (payload: CreateCommentInput) => {
    const formData = new FormData();
    formData.append('postId', payload.postId);
    formData.append('content', payload.content);
    formData.append('isAnonymous', String(payload.isAnonymous));

    if (payload.parentCommentId) {
        formData.append('parentCommentId', payload.parentCommentId);
    }

    if (payload.askedAi !== undefined) {
        formData.append('askedAi', String(payload.askedAi));
    }

    if (payload.aiQuestion) {
        formData.append('aiQuestion', payload.aiQuestion);
    }

    const imagePart = buildImagePart(payload.image ?? null);
    if (imagePart) {
        formData.append('image', imagePart);
    }

    return formData;
};

export const ApiService = {
    isMockMode: () => USE_MOCK_DATA,

    getMockLoginSeed: () => {
        if (USE_MOCK_DATA && ApiMock.getMockLoginSeed) return ApiMock.getMockLoginSeed();
        return null;
    },

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

        const response = await apiClient.post('/posts', toMultipartPostFormData(payload), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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

        const response = await apiClient.post('/comments', toMultipartCommentFormData(payload), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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

    // getTopicStats: async (topicId: string) => {
    //     if (USE_MOCK_DATA) return ApiMock.getTopicStats?.(topicId) || { discussionCount: 0 };
    //     const response = await apiClient.get(`/topics/${topicId}/stats`);
    //     return response.data;
    // },
    
    getCurrentTopicSelectorData: async (): Promise<{id: string, name: string}[]> => {
        const topics = await ApiService.getTopics();
        
        return topics
            .filter((topic: TopicsData) => topic.status === 'current')
            .map((topic: TopicsData) => ({
                id: topic.id,
                name: topic.name
            }));
    },

    // Notifications
    getNotifications: async () => {
        if (USE_MOCK_DATA) return ApiMock.getNotifications();

        const response = await apiClient.get('/notifications');
        return response.data;
    },

    markNotificationAsRead: async (notificationId: string) => {
        if (USE_MOCK_DATA) return ApiMock.markNotificationAsRead?.(notificationId);
        const response = await apiClient.patch(`/notifications/${notificationId}/read`);
        return response.data;
    },

    // Profile
    getUserProfile: async (): Promise<ProfileCardData> => {
        if (USE_MOCK_DATA) return ApiMock.getUserProfile();
        try {
            const response = await apiClient.get('/me/profile');
            return response.data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null as any;
        }
    },

    getUserHistory: async (): Promise<UserHistory[]> => {
        if (USE_MOCK_DATA) return ApiMock.getUserHistory();

        try {
            const response = await apiClient.get('/me/history');
            return response.data;
        } catch (error) {
            console.error('Error fetching user history:', error);
            return [];
        }
    },

    updateAnonymousStatus: async (isAnonymous: boolean) => {
        // if (USE_MOCK_DATA) return ApiMock.updateAnonymousStatus?.(isAnonymous) || { success: true, isAnonymous };
        const response = await apiClient.patch('/me/anonymous-status', { isAnonymous });
        return response.data;
    },

    // Auth
    login: async (email: string, isStudent: boolean, nim: string, name: string) => {
        if (USE_MOCK_DATA) return ApiMock.login?.(email, isStudent, nim, name) || { token: 'mock-token', user: { id: '1', email, name: 'Mock User', nim: '12345', isStudent: true } };

        const response = await apiClient.post('/api/auth/login', { email });
        return response.data;
    },

    loginWithGoogle: async (idToken: string) => {
        if (USE_MOCK_DATA) return ApiMock.login?.("haninno@student.ciputra.ac.id", true, "12345", "Han Inno");

        const response = await apiClient.post('/api/auth/google', { idToken });
        return response.data;
    },

    demologin: async (email: string, isStudent: boolean, nim: string, name: string) => {
        if (USE_MOCK_DATA) return ApiMock.login?.(email, isStudent, nim, name) || { token: 'mock-token', user: { id: '1', email, name: 'Mock User', nim: '12345', isStudent: true } };

        const response = await apiClient.post('/api/auth/demo-login', { email });
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