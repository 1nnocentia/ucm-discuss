import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "@/context/ThemeContext";
import { ProfileTabs } from "@/components/history/profileTabs";
import { ProfileCard } from "@/components/profile/profileCard";
import { ApiService } from "@/controllers/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { UserHistory } from "@/models/user";
import { useFocusEffect } from "expo-router";


export const profileScreen = () => {
    const { theme } = useTheme();
    const { user, userDetails, refreshUserDetails, loading: authLoading } = useAuth();
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        if (user && !userDetails) {
            refreshUserDetails();
        }
    }, [user, userDetails, refreshUserDetails]);

    useEffect(() => {
        setIsAnonymous(userDetails?.isAnonymous ?? false);
    }, [userDetails?.isAnonymous]);

    const { data: historyData = [], isLoading: historyLoading, isError: historyError, refetch } = useQuery<UserHistory[]>({
        queryKey: ['profile-history', user?.id],
        queryFn: async (): Promise<UserHistory[]> => {
            if (!user?.id) return [];
            return await ApiService.getUserHistory();
        },
        enabled: !!user?.id,
    });

    useFocusEffect(
        useCallback(() => {
            refreshUserDetails();
            refetch();
        }, [refreshUserDetails, refetch])
    );

    // const handleAnonymousToggle = (isAnonymous: boolean) => {
    //     setIsAnonymous(isAnonymous);
    //     console.log('Toggle anonymous:', isAnonymous);
    // };
    
    const handleAnonymousToggle = (value: boolean) => {
        setIsAnonymous(value);
        return ApiService.updateAnonymousStatus(value)
            .then(() => {
                console.log('Anonymous status updated successfully');
                refreshUserDetails();
            })
            .catch((error) => {
                console.error('Error updating anonymous status:', error);
            });
    }


    const isLoading = authLoading || historyLoading;
    console.log('User datails:', userDetails);

    return (
        <SafeAreaView edges={['top']} style={[styles.viewStyle, { backgroundColor: theme.colors.primary }]}>
            <ScrollView
                style={[styles.scrollContainer, { backgroundColor: theme.colors.background }]}
                contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.colors.background }]}
                keyboardShouldPersistTaps="handled"
            >
                {isLoading ? (
                    <View style={styles.centerContent}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={{ marginTop: 10, color: theme.colors.textSecondary }}>Memuat profil...</Text>
                    </View>
                ) : !user ? (
                    <View style={styles.centerContent}>
                        <Text style={{ color: theme.colors.textSecondary }}>You are not logged in.</Text>
                    </View>
                ) : historyError || !userDetails ? (
                    <View style={styles.centerContent}>
                        <Text style={{ color: theme.colors.textSecondary }}>Failed to load profile.</Text>
                    </View>
                ) : (
                    <>
                        <ProfileCard 
                            user={{
                                name: userDetails?.name,
                                nim: userDetails?.nim,
                                major: userDetails?.major,
                                faculty: userDetails?.faculty,
                                votesCount: userDetails?.votesCount,
                                headerImage: userDetails?.headerImage,
                                postCount: userDetails?.postCount,
                                commentCount: userDetails?.commentCount,
                                isAnonymous: isAnonymous, 
                            }}
                            onAnonymousToggle={handleAnonymousToggle}
                        />
                        <ProfileTabs data={historyData} />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default profileScreen;

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    }
})