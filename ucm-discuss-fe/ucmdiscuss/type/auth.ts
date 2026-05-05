import { User } from "@/models/user";

export interface AuthcontextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string) => Promise<boolean>;
    logout: () => Promise<void>;
}