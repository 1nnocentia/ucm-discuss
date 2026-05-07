export interface User {
    id: number;
    email: string;
    is_student: boolean;
    nim: string;
    name: string;
}

export interface ProfileCard {
    name: string;
    nim: string;
    major: string;
    faculty: string;
    postCount: number;
    commentCount: number;
    headerImage?: string;
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

