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

export interface Post  {
    id: string;
    title: string;
    createdAt: string;
    votes: number;
    comments: number;
    image: string | null;
    description: string | null;
    topic: Topics;
    user: User;
    userVoteStatus?: boolean;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    parentPostId: string | null;
    comment: string;
    createdAt: string;
    votes: number;
    user: User;
    replies: Comment[];
    userVoteStatus?: boolean;
}

export interface Topics {
    id: string;
    name: string;
}

export interface CreatePostInput {
    title: string;
    description: string | null;
    image?: string | null;
    topicId: string;
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

export type ProfileCardData = Pick<UserProfile, 
  'name' | 'nim' | 'major' | 'faculty' | 'votesCount' | 'headerImage' | 'postCount' | 'commentCount'
>;

export type UserHistory = PostHistory | CommentHistory;
