export interface User {
    id: number;
    email: string;
    is_student: boolean;
}


export interface History {
    id: number;
    username: string;
    is_type_post: boolean;
    description: string;
    voteCount: number;
    commentCount: number;
    createdAt: Date;
}