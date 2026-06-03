import { ProfileCardData, User } from "@/models/user";

export interface AuthcontextType {
    user: User | null;
    userDetails: ProfileCardData | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    refreshUserDetails: () => Promise<void>;
    login: (email?: string, isStudent?: boolean, nim?: string, name?: string) => Promise<boolean>;
    demoLogin: () => Promise<boolean>;
    logout: () => Promise<boolean>;
}