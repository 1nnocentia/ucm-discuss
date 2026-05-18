export interface User {
    id: string;
    email: string;
    isStudent: boolean;
    nim: string;
    name: string;
}

export interface UserProfile extends User {
    major: string;
    faculty: string;
    votesCount: number;
    contributionsCount: number;
    headerImage?: string;
    postCount: number;
    commentCount: number;
    isAnonymous: boolean;
}

export interface Topics {
    id: string;
    name: string;
}

export interface AuthorSnippet {
    id: string;
    name: string;
    isAnonymous: boolean;
}

export interface Post  {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    createdAt: string;
    votes: number;
    comments: number;
    topic: Topics;
    user: AuthorSnippet;
    userVoteStatus?: boolean;
}

export interface ThreadComment {
    id: string;
    postId: string;
    parentPostId: string | null;
    content: string;
    image: string | null;
    createdAt: string;
    votes: number;
    user: AuthorSnippet;
    userVoteStatus?: boolean;
    replies?: ThreadComment[];
}

export interface CreatePostInput {
    title: string;
    description: string | null;
    image?: string | null;
    topicId: string;
    isAnonymous: boolean;
}

export interface CreateCommentInput {
    postId: string;
    parentCommentId?: string | null;
    content: string;
    image?: string | null;
    isAnonymous: boolean;
}

export interface PostHistory {
    type: 'post';
    id: string;
    title: string;
    createdAt: string;
    votesCount: number;
    commentCount: number;
}

export interface CommentHistory {
    type: 'comment';
    id: string;
    postId: string;
    content: string;
    parentPostTitle: string;
    createdAt: string;
    votesCount: number;
    commentCount: number;
}

export type UserHistory = PostHistory | CommentHistory;

export interface NotificationProps {
    id: string;
    actorName: string;
    actionType: 'reply_post' | 'reply_comment' | 'vote';
    targetSnippet: string;
    createdAt: string;
    isRead: boolean;
}

export interface TopicDetail extends Topics {
    description: string;
    status: 'current' | 'past';
    discussionCount: number;
}

export type FilterType = 'all' | 'current' | 'past';

export type TopicsData = Pick<TopicDetail, 'id' | 'name' | 'description' | 'status' | 'discussionCount'>;

export type ProfileCardData = Pick<UserProfile, 
  'name' | 'nim' | 'major' | 'faculty' | 'votesCount' | 'headerImage' | 'postCount' | 'commentCount' | 'isAnonymous'
>;