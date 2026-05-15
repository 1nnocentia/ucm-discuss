import React, { useState } from "react";
import {  ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "@/context/ThemeContext";
import { ProfileTabs } from "@/components/history/profileTabs";
import { dummyHistoryData, dummyProfileData } from "@/constants/dummyData/dummyData";
import { ProfileCard } from "@/components/profile/profileCard";


export const profileScreen = () => {
    return (
        <SafeAreaView style={styles.viewStyle}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}>
                <ProfileCard user={dummyProfileData} />
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
        // flex: 1,
    }
})