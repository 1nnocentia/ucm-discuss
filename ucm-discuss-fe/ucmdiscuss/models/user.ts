export interface User {
    id: number;
    email: string;
    is_student: boolean;
}

export interface History {
    id: number;
    username: string;
    type: 'post' | 'comment';
    description: string;
    voteCount: number;
    commentCount: number;
    createdAt: Date;
}