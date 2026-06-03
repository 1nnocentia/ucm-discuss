import { MOCK_POSTS, MOCK_THREAD_COMMENTS, TOPICS, MOCK_NOTIFICATIONS, USERS, MOCK_PROFILE, MOCK_HISTORY } from '@/constants/dummyData/dummyData';
import { Post, ThreadComment, CreatePostInput, CreateCommentInput, ProfileCardData, UserHistory } from '@/models/user';
import { findAndMutateCommentVote } from '@/utils/voteHelper';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const normalizeAiInteraction = (value: CreatePostInput['aiInteraction']) => {
    if (!value) {
        return undefined;
    }

    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch {
            return undefined;
        }
    }

    return value;
};

export const ApiMock = {
    getMockLoginSeed: () => ({
        email: 'student@ucm.ac.id',
        isStudent: true,
        nim: '0806022410010',
        name: USERS.current.name,
    }),

    getPosts: async (page = 1, limit = 10): Promise<Post[]> => {
        await delay(800);
        return MOCK_POSTS.slice((page - 1) * limit, page * limit);
    },

    getPostDetail: async (postId: string): Promise<Post | undefined> => {
        await delay(500);
        return MOCK_POSTS.find(p => p.id === postId);
    },

    getComments: async (postId: string): Promise<ThreadComment[]> => {
        await delay(800);
        return MOCK_THREAD_COMMENTS.filter((c) => c.postId === postId);
    },

    getTopics: async () => {
        await delay(500);
        return TOPICS;
    },

    getTopicStats: async (topicId: string) => {
        await delay(300);
        const topic = TOPICS.find(t => t.id === topicId);
        return {
            discussionCount: topic ? Math.floor(Math.random() * 1000) : 0,
        };
    },

    getNotifications: async () => {
        await delay(600);
        return MOCK_NOTIFICATIONS;
    },

    markNotificationAsRead: async (notificationId: string) => {
        await delay(200);
        const notif = MOCK_NOTIFICATIONS.find(n => n.id === notificationId);
        if (notif) {
            notif.isRead = true;
        }
    },

    getUserProfile: async (): Promise<ProfileCardData> => {
        await delay(500);
        return MOCK_PROFILE;
    },

    getUserHistory: async (): Promise<UserHistory[]> => {
        await delay(500);
        return MOCK_HISTORY;
    },

    createPost: async (payload: CreatePostInput): Promise<Post> => {
        await delay(1000);
        const newPost: Post = {
            id: `p-new-${Date.now()}`,
            title: payload.title,
            description: payload.description,
            image: payload.image || null,
            aiInteraction: normalizeAiInteraction(payload.aiInteraction),
            createdAt: 'Now',
            votes: 0,
            comments: 0,
            topic: TOPICS.find(t => t.id === payload.topicId) || { id: payload.topicId, name: 'Unknown' },
            user: payload.isAnonymous ? USERS.anon1 : USERS.current,
            userVoteStatus: false,
        };
        MOCK_POSTS.unshift(newPost);
        return newPost;
    },

    createComment: async (payload: CreateCommentInput): Promise<ThreadComment> => {
        await delay(1000);
        const newComment: ThreadComment = {
            id: `c-new-${Date.now()}`,
            postId: payload.postId,
            parentPostId: payload.parentCommentId || null,
            content: payload.content,
            image: payload.image || null,
            createdAt: 'Now',
            votes: 0,
            user: payload.isAnonymous ? USERS.anon1 : USERS.current,
            replies: []
        };
        if (payload.parentCommentId) {
            const insertReply = (comments: ThreadComment[]): boolean => {
                for (let c of comments) {
                    if (c.id === payload.parentCommentId) {
                        c.replies = c.replies || [];
                        c.replies.push(newComment);
                        return true;
                    }
                    if (c.replies && insertReply(c.replies)) return true;
                }
                return false;
            };
            insertReply(MOCK_THREAD_COMMENTS);
        } else {
            MOCK_THREAD_COMMENTS.push(newComment);
        }
        const targetPost = MOCK_POSTS.find((p) => p.id === payload.postId);
        if (targetPost) targetPost.comments += 1;

        return newComment;
    },

    getUserPosts: async (userId: string): Promise<Post[]> => {
        await delay(800);
        return MOCK_POSTS.filter(p => p.user.id === userId);
    },

    getUserComments: async (userId: string): Promise<ThreadComment[]> => {
        await delay(800);
        return MOCK_THREAD_COMMENTS.filter(c => c.user.id === userId);
    },

    votePost: async (postId: string, isVoted: boolean) => {
        await delay(200);
        const post = MOCK_POSTS.find((p) => p.id === postId);
        if (post) {
            post.userVoteStatus = isVoted;
            post.votes = isVoted ? post.votes + 1 : Math.max(0, post.votes - 1);
        }
        return { success: true, isVoted };
    },

    voteComment: async (commentId: string, isVoted: boolean) => {
        await delay(200);
        findAndMutateCommentVote(MOCK_THREAD_COMMENTS, commentId, isVoted);
        return { success: true, isVoted };
    },

    login: async (email: string, isStudent: boolean, nim: string, name: string) => {
        await delay(500);
        const seed = ApiMock.getMockLoginSeed();
        return {
            token: 'mock-jwt-token-12345',
            user: {
                id: USERS.current.id,
                email: email || seed.email,
                isStudent: isStudent ?? seed.isStudent,
                nim: nim || seed.nim,
                name: name || seed.name,
            }
        };
    },

    logout: async () => {
        await delay(300);
        return true;
    },

    search: async (query: string): Promise<{ posts: Post[]; comments: ThreadComment[] }> => {
        await delay(600);
        
        return {
            posts: MOCK_POSTS.filter(p => p.title.includes(query) || p.description?.includes(query)),
            comments: MOCK_THREAD_COMMENTS.filter(c => c.content.includes(query))
        };
    }
};



// import { TopicsData, Post, ThreadComment, CreatePostInput, CreateCommentInput } from '@/models/user';
// import { TopicsDummyData, dummyHomePosts, MOCK_POST } from './dummyData';

// export const ApiMock = {
//   // Topics
//   getTopics: {
//     request: { method: 'GET', path: '/api/topics', query: { filter: 'all', page: 1, limit: 20 } },
//     response: {
//       total: TopicsDummyData.length,
//       topics: TopicsDummyData as TopicsData[],
//     },
//   },

//   getTopicDetail: (topicId: string) => ({
//     request: { method: 'GET', path: `/api/topics/${topicId}` },
//     response: {
//       id: topicId,
//       name: TopicsDummyData.find(t => t.id === topicId)?.name ?? 'Unknown Topic',
//       description: TopicsDummyData.find(t => t.id === topicId)?.description ?? '',
//       status: TopicsDummyData.find(t => t.id === topicId)?.status ?? 'current',
//       discussionCount: TopicsDummyData.find(t => t.id === topicId)?.discussionCount ?? 0,
//       membersCount: '1.2k',
//       onlineCount: 42,
//       bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1080&auto=format&fit=crop',
//       iconUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=200&auto=format&fit=crop',
//       isJoined: false,
//     },
//   }),

//   // Posts
//   listPosts: {
//     request: { method: 'GET', path: '/api/posts', query: { topicId: null, page: 1, limit: 20 } },
//     response: {
//       total: dummyHomePosts.length,
//       posts: dummyHomePosts as Post[],
//       page: 1,
//       limit: 20,
//     },
//   },

//   getPost: (postId: string) => ({
//     request: { method: 'GET', path: `/api/posts/${postId}` },
//     response: {
//       post: postId === MOCK_POST.id ? MOCK_POST : dummyHomePosts.find(p => p.id === postId) ?? MOCK_POST,
//     },
//   }),

//   createPostExample: {
//     request: {
//       method: 'POST',
//       path: '/api/posts',
//       body: {
//         title: 'Contoh judul post dari mock',
//         description: 'Deskripsi panjang yang menjelaskan konteks post.',
//         image: null,
//         topicId: TopicsDummyData[0].id,
//         isAnonymous: false,
//       } as CreatePostInput,
//     },
//     response: {
//       ...dummyHomePosts[0],
//       id: 'post-new-123',
//       createdAt: new Date().toISOString(),
//       votes: 0,
//       comments: 0,
//     },
//   },

//   // Comments
//   listComments: (postId: string) => ({
//     request: { method: 'GET', path: `/api/posts/${postId}/comments` },
//     response: {
//       total: 0,
//       comments: [] as ThreadComment[],
//     },
//   }),

//   createCommentExample: {
//     request: {
//       method: 'POST',
//       path: '/api/comments',
//       body: {
//         postId: MOCK_POST.id,
//         parentCommentId: null,
//         content: 'Ini adalah contoh komentar yang dibuat melalui API mock.',
//         image: null,
//         isAnonymous: false,
//       } as CreateCommentInput,
//     },
//     response: {
//       id: 'comment-new-123',
//       createdAt: new Date().toISOString(),
//       votes: 0,
//       user: { id: 'user-001', name: 'Han Inno', isAnonymous: false },
//       content: 'Ini adalah contoh komentar yang dibuat melalui API mock.',
//     },
//   },

//   // Notifications
//   listNotifications: {
//     request: { method: 'GET', path: '/api/notifications' },
//     response: {
//       total: 4,
//       notifications: [
//         { id: 'notif-001', actorName: 'Mifey', actionType: 'reply_post', targetSnippet: 'Sharing: Pengalaman styling...', createdAt: '10 menit yang lalu', isRead: false },
//         { id: 'notif-002', actorName: 'Andi', actionType: 'reply_comment', targetSnippet: 'Wah mantap Han...', createdAt: '1 jam yang lalu', isRead: false },
//       ],
//     },
//   },

//   // Common errors
//   errors: {
//     validationError: { status: 422, body: { message: 'Validation failed', details: [{ field: 'title', message: 'Title is required' }] } },
//     unauthorized: { status: 401, body: { message: 'Unauthorized' } },
//   },
// };

// export default ApiMock;
