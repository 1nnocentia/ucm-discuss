export interface User {
    id: number;
    email: string;
    is_student: boolean;
    nim: string;
    name: string;
}

export interface ProfileCardData {
    name: string;
    nim: string;
    major: string;
    faculty: string;
    votes_count: number;
    contributions_count: number;
    headerImage?: string;
    post_count: number;
    comment_count: number;
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

