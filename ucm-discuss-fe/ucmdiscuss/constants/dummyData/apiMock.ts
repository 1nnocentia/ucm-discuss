import { TopicsData, Post, ThreadComment, CreatePostInput, CreateCommentInput } from '@/models/user';
import { TopicsDummyData, dummyHomePosts, MOCK_POST } from './dummyData';

export const ApiMock = {
  // Topics
  getTopics: {
    request: { method: 'GET', path: '/api/topics', query: { filter: 'all', page: 1, limit: 20 } },
    response: {
      total: TopicsDummyData.length,
      topics: TopicsDummyData as TopicsData[],
    },
  },

  getTopicDetail: (topicId: string) => ({
    request: { method: 'GET', path: `/api/topics/${topicId}` },
    response: {
      id: topicId,
      name: TopicsDummyData.find(t => t.id === topicId)?.name ?? 'Unknown Topic',
      description: TopicsDummyData.find(t => t.id === topicId)?.description ?? '',
      status: TopicsDummyData.find(t => t.id === topicId)?.status ?? 'current',
      discussionCount: TopicsDummyData.find(t => t.id === topicId)?.discussionCount ?? 0,
      membersCount: '1.2k',
      onlineCount: 42,
      bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1080&auto=format&fit=crop',
      iconUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=200&auto=format&fit=crop',
      isJoined: false,
    },
  }),

  // Posts
  listPosts: {
    request: { method: 'GET', path: '/api/posts', query: { topicId: null, page: 1, limit: 20 } },
    response: {
      total: dummyHomePosts.length,
      posts: dummyHomePosts as Post[],
      page: 1,
      limit: 20,
    },
  },

  getPost: (postId: string) => ({
    request: { method: 'GET', path: `/api/posts/${postId}` },
    response: {
      post: postId === MOCK_POST.id ? MOCK_POST : dummyHomePosts.find(p => p.id === postId) ?? MOCK_POST,
    },
  }),

  createPostExample: {
    request: {
      method: 'POST',
      path: '/api/posts',
      body: {
        title: 'Contoh judul post dari mock',
        description: 'Deskripsi panjang yang menjelaskan konteks post.',
        image: null,
        topicId: TopicsDummyData[0].id,
        isAnonymous: false,
      } as CreatePostInput,
    },
    response: {
      ...dummyHomePosts[0],
      id: 'post-new-123',
      createdAt: new Date().toISOString(),
      votes: 0,
      comments: 0,
    },
  },

  // Comments
  listComments: (postId: string) => ({
    request: { method: 'GET', path: `/api/posts/${postId}/comments` },
    response: {
      total: 0,
      comments: [] as ThreadComment[],
    },
  }),

  createCommentExample: {
    request: {
      method: 'POST',
      path: '/api/comments',
      body: {
        postId: MOCK_POST.id,
        parentCommentId: null,
        content: 'Ini adalah contoh komentar yang dibuat melalui API mock.',
        image: null,
        isAnonymous: false,
      } as CreateCommentInput,
    },
    response: {
      id: 'comment-new-123',
      createdAt: new Date().toISOString(),
      votes: 0,
      user: { id: 'user-001', name: 'Han Inno', isAnonymous: false },
      content: 'Ini adalah contoh komentar yang dibuat melalui API mock.',
    },
  },

  // Notifications
  listNotifications: {
    request: { method: 'GET', path: '/api/notifications' },
    response: {
      total: 4,
      notifications: [
        { id: 'notif-001', actorName: 'Mifey', actionType: 'reply_post', targetSnippet: 'Sharing: Pengalaman styling...', createdAt: '10 menit yang lalu', isRead: false },
        { id: 'notif-002', actorName: 'Andi', actionType: 'reply_comment', targetSnippet: 'Wah mantap Han...', createdAt: '1 jam yang lalu', isRead: false },
      ],
    },
  },

  // Common errors
  errors: {
    validationError: { status: 422, body: { message: 'Validation failed', details: [{ field: 'title', message: 'Title is required' }] } },
    unauthorized: { status: 401, body: { message: 'Unauthorized' } },
  },
};

export default ApiMock;
