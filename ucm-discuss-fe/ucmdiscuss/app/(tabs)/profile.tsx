import React, { useState } from "react";
import {  ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "@/context/ThemeContext";
import { ProfileTabs } from "@/components/history/profileTabs";
import { dummyHistoryData, dummyProfileData } from "@/constants/dummyData/dummyData";
import { ProfileCard } from "@/components/profile/profileCard";


export const profileScreen = () => {
    const { theme } = useTheme();
    const [profileData, setProfileData] = useState(dummyProfileData);

    const handleAnonymousToggle = (isAnonymous: boolean) => {
        setProfileData((prev) => ({
            ...prev,
            isAnonymous,
        }));
        // set user status jadi anonym
        console.log('Toggle anonymous:', isAnonymous);
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.viewStyle, { backgroundColor: theme.colors.primary }]}>
            <ScrollView
                style={[styles.scrollContainer, { backgroundColor: theme.colors.background }]}
                contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.colors.background }]}
            >
                <ProfileCard 
                    user={profileData} 
                    onAnonymousToggle={handleAnonymousToggle}
                />
                <ProfileTabs data={dummyHistoryData} />
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
    }
})