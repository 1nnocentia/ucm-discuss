import { useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ProfileTabs } from "@/components/history/profileTabs";
import { dummyHistoryData, dummyProfileData } from "@/constants/dummyData/dummyData";
import { ProfileCard } from "@/components/profile/profileCard";


export const profileScreen = () => {
    return (
        <ScrollView>
            <ProfileCard user={dummyProfileData} />
            <ProfileTabs data={dummyHistoryData} />
        </ScrollView>
    );
}

export default profileScreen;