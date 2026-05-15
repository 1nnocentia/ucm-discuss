import { useSearch } from "@/context/SearchContext";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { AnimatedSearchOverlay } from "@/components/search/animatedSearchOverlay";
import HomePostCard from "@/components/threadCard/homePostCard";
import { useRouter } from "expo-router";
import { Post } from "@/models/user";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { dummyHomePosts } from "@/constants/dummyData/dummyData";

export default function homeScreen() {
    const { theme } = useTheme();
    const router = useRouter();

    const { isSearchActive, searchQuery } = useSearch();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <FlashList 
                data={dummyHomePosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <HomePostCard
                        post={item}
                        onPress={() => router.push(`/threads/${item.id}`)}
                    />
                )}
            />

            {isSearchActive && (
                <AnimatedSearchOverlay 
                    isSearchActive={isSearchActive}
                    searchQuery={searchQuery}
                />
            )}
        </View>
    )
}