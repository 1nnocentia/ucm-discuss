import { User } from "@/models/user";
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthcontextType } from "@/type/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiService } from "@/controllers/services/apiService";

const AuthContext = createContext<AuthcontextType | undefined>(undefined);

export function AuthProvider({ children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user && !!token;

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const [storedToken, storedUser] = await Promise.all([
                AsyncStorage.getItem('authToken'),
                AsyncStorage.getItem('userData'),
            ]);

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, isStudent = false, nim = '', name = '') => {
        try {
            setLoading(true);
            const data = await ApiService.login(email, isStudent, nim, name, '');

            await Promise.all([
                AsyncStorage.setItem('authToken', data.token),
                AsyncStorage.setItem('userData', JSON.stringify(data.user)),
            ]);

            setToken(data.token);
            setUser(data.user);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await ApiService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }

        await Promise.all([
            AsyncStorage.removeItem('authToken'),
            AsyncStorage.removeItem('userData'),
        ]);
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
