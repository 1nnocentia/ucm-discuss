import { User } from "@/models/user";
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthcontextType } from "@/type/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const login = async (email: string) => {
        try {
            setLoading(true);
            const response = await fetch("", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if  (response.ok) {
                const data = await response.json();

                await Promise.all([
                    AsyncStorage.setItem('authToken', data.token),
                    AsyncStorage.setItem('userData', JSON.stringify(data.user)),
                ]);

                setToken(data.token);
                setUser(data.user);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
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
