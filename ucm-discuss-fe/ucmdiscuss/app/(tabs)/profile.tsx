import { useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ProfileTabs } from "@/components/history/profileTabs";
import { dummyHistoryData } from "@/constants/dummyData/dummyData";


export const profileScreen = () => {
    return (
        <ScrollView>
            {/* <UserInfo /> */}
            <ProfileTabs data={dummyHistoryData} />
        </ScrollView>
    );
}

export default profileScreen;