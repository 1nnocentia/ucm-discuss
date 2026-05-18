import { useSearch } from "@/context/SearchContext";
import { useTheme } from "@/context/ThemeContext";
import { useDebounce } from "@/controllers/hooks/useDebounce";

import { View } from "react-native";
import { AnimatedSearchOverlay } from "@/components/search/animatedSearchOverlay";
import HomePostCard from "@/components/threadCard/homePostCard";
import { useFocusEffect, useRouter } from "expo-router";
import { Post } from "@/models/user";
import React, { useCallback, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { dummyHomePosts } from "@/constants/dummyData/dummyData";

export default function homeScreen() {
    const { theme } = useTheme();
    const router = useRouter();

    const [posts, setPosts] = useState<Post[]>(dummyHomePosts);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPostsData = async (): Promise<Post[]> => {
        return new Promise((resolve) => setTimeout(() => resolve(dummyHomePosts), 1000));
    };

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const loadPosts = async () => {
                setIsLoading(true);
                const data = await fetchPostsData();
                if (isActive) {
                    setPosts(data);
                    setIsLoading(false);
                }
            };
            loadPosts();

            return () => {
                isActive = false;
            };
        }, [])
    );

    const { isSearchActive, searchQuery } = useSearch();
    const debounceSearchQuery = useDebounce(searchQuery, 500);

    

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
                    searchQuery={debounceSearchQuery}
                />
            )}
        </View>
    )
}