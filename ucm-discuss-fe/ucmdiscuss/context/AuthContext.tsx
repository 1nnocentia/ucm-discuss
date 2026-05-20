import { ProfileCardData, User } from "@/models/user";
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthcontextType } from "@/type/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiService } from "@/controllers/services/apiService";

const AuthContext = createContext<AuthcontextType | undefined>(undefined);
const USER_DETAILS_TTL_MS = 24 * 60 * 60 * 1000;

export function AuthProvider({ children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userDetails, setUserDetails] = useState<ProfileCardData | null>(null);
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
            const [storedUserDetails, storedUserDetailsAt] = await Promise.all([
                AsyncStorage.getItem('userDetails'),
                AsyncStorage.getItem('userDetailsUpdatedAt'),
            ]);

            if (storedToken && storedUser) {
                const parsedUser = JSON.parse(storedUser) as User;
                setToken(storedToken);
                setUser(parsedUser);

                const detailsAge = storedUserDetailsAt ? Date.now() - Number(storedUserDetailsAt) : Number.POSITIVE_INFINITY;

                if (storedUserDetails && detailsAge < USER_DETAILS_TTL_MS) {
                    setUserDetails(JSON.parse(storedUserDetails) as ProfileCardData);
                } else {
                    try {
                        const freshDetails = await ApiService.getUserProfile();
                        setUserDetails(freshDetails);
                        await Promise.all([
                            AsyncStorage.setItem('userDetails', JSON.stringify(freshDetails)),
                            AsyncStorage.setItem('userDetailsUpdatedAt', String(Date.now())),
                        ]);
                    } catch (error) {
                        console.error('Failed to refresh user details:', error);
                        if (storedUserDetails) {
                            setUserDetails(JSON.parse(storedUserDetails) as ProfileCardData);
                        }
                    }
                }
            } else if (ApiService.isMockMode()) {
                // In mock mode, bootstrap a local session so profile can be explored before backend auth exists.
                await login();
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email = '', isStudent = false, nim = '', name = '') => {
        try {
            setLoading(true);
            const mockSeed = ApiService.getMockLoginSeed();

            const resolvedEmail = email || mockSeed?.email || '';
            const resolvedIsStudent = typeof isStudent === 'boolean' ? isStudent : (mockSeed?.isStudent ?? false);
            const resolvedNim = nim || mockSeed?.nim || '';
            const resolvedName = name || mockSeed?.name || '';

            const data = await ApiService.login(resolvedEmail, resolvedIsStudent, resolvedNim, resolvedName, '');
            const freshDetails = await ApiService.getUserProfile();

            await Promise.all([
                AsyncStorage.setItem('authToken', data.token),
                AsyncStorage.setItem('userData', JSON.stringify(data.user)),
                AsyncStorage.setItem('userDetails', JSON.stringify(freshDetails)),
                AsyncStorage.setItem('userDetailsUpdatedAt', String(Date.now())),
            ]);

            setToken(data.token);
            setUser(data.user);
            setUserDetails(freshDetails);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const refreshUserDetails = async () => {
        // if (!token) return;  Karena belum bisa

        try {
            setLoading(true);
            console.log("Memanggil API getUserProfile...");
            const freshDetails = await ApiService.getUserProfile();
            console.log("Data Profil berhasil diambil:", freshDetails);
            setUserDetails(freshDetails);

            await Promise.all([
                AsyncStorage.setItem('userDetails', JSON.stringify(freshDetails)),
                AsyncStorage.setItem('userDetailsUpdatedAt', String(Date.now())),
            ]);
        } catch (error) {
            console.error('Failed to refresh user details in context:', error);
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
            AsyncStorage.removeItem('userDetails'),
            AsyncStorage.removeItem('userDetailsUpdatedAt'),
        ]);
        setToken(null);
        setUser(null);
        setUserDetails(null);
    };

    return (
        <AuthContext.Provider value={{ user, userDetails, token, isAuthenticated, loading, refreshUserDetails, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
