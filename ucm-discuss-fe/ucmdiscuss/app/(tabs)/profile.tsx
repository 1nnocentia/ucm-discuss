import React, { useState } from "react";
import {  ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "@/context/ThemeContext";
import { ProfileTabs } from "@/components/history/profileTabs";
import { dummyHistoryData, dummyProfileData } from "@/constants/dummyData/dummyData";
import { ProfileCard } from "@/components/profile/profileCard";


export const profileScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <ProfileCard user={dummyProfileData} />
                <ProfileTabs data={dummyHistoryData} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default profileScreen;