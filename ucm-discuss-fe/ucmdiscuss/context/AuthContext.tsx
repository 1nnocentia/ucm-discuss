import { ProfileCardData, User } from "@/models/user";
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { AuthcontextType } from "@/type/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiService } from "@/controllers/services/apiService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext<AuthcontextType | undefined>(undefined);
const USER_DETAILS_TTL_MS = 24 * 60 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userDetails, setUserDetails] = useState<ProfileCardData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const resolveAuthResponse = (response: any) => {
        const payload = response?.data?.data ?? response?.data ?? response;

        return {
            token: payload?.token ?? payload?.jwtToken ?? response?.data?.token ?? response?.data?.jwtToken ?? response?.token ?? response?.jwtToken,
            user: payload?.user ?? payload?.userLoginDto ?? response?.data?.user ?? response?.data?.userLoginDto ?? response?.user,
        };
    };

    const isAuthenticated = !!user && !!token;

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        });
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
            }
            // else if (ApiService.isMockMode()) {
            //     // In mock mode, bootstrap a local session so profile can be explored before backend auth exists.
            //     await login();
            // }
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        try {
            setLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = (await GoogleSignin.signIn()) as any;
            const idToken = userInfo.idToken || userInfo.data?.idToken;

            if (!idToken) {
                throw new Error("No ID Token received from Google Sign-In");
            }

            const response = await ApiService.loginWithGoogle(idToken);
            const { token: resolvedToken, user: resolvedUser } = resolveAuthResponse(response);

            if (!resolvedToken) {
                throw new Error('Token not found in login response');
            }

            await AsyncStorage.setItem('authToken', resolvedToken);

            const freshDetails = await ApiService.getUserProfile();

            await Promise.all([
                AsyncStorage.setItem('userData', JSON.stringify(resolvedUser)),
                AsyncStorage.setItem('userDetails', JSON.stringify(freshDetails)),
                AsyncStorage.setItem('userDetailsUpdatedAt', String(Date.now())),
            ]);

            setToken(resolvedToken);
            setUser(resolvedUser);
            setUserDetails(freshDetails);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const demoLogin = async () => {
        try {
            setLoading(true);

            const targetEmail = 'haninno@student.ciputra.ac.id';
            const response = await ApiService.demologin(targetEmail, true, '12345', 'Han Inno');

            console.log("ISI RESPONSE DARI BACKEND:", response);

            const { token: realToken, user: realUser } = resolveAuthResponse(response);

            if (!realToken) {
                throw new Error("Token not found in demo login response");
            }

            await AsyncStorage.setItem('authToken', realToken);

            const freshDetails = await ApiService.getUserProfile();

            await Promise.all([
                AsyncStorage.setItem('userData', JSON.stringify(realUser)),
                AsyncStorage.setItem('userDetails', JSON.stringify(freshDetails)),
                AsyncStorage.setItem('userDetailsUpdatedAt', String(Date.now())),
            ]);

            setToken(realToken);
            setUser(realUser);
            setUserDetails(freshDetails);
            return true;
        } catch (error) {
            console.error('Demo login error:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const refreshUserDetails = useCallback(async () => {
        // if (!token) return;  Karena belum bisa

        try {
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
        }
    }, []);


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

        return true;
    };

    const updateLocalVotesCount = useCallback((increment: boolean) => {
        setUserDetails(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                votesCount: prev.votesCount + (increment ? 1 : -1)
            };
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user, userDetails, token, isAuthenticated, loading, refreshUserDetails, login, demoLogin, logout, updateLocalVotesCount }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};
