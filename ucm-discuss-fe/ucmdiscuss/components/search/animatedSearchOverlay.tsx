import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { useSearchThreads } from '@/controllers/hooks/useSearchThread';
import { useRouter } from 'expo-router';
import SearchResultItem from '@/components/threadCard/searchResultItem';
import { Post } from '@/models/user';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SEARCH_HISTORY_KEY = "@ucm_discuss_search_history";

interface SearchOverlayProps {
    isSearchActive: boolean;
    searchQuery: string;
    onHistoryPress?: (query: string) => void;
}

export const AnimatedSearchOverlay = ({ isSearchActive, searchQuery, onHistoryPress }: SearchOverlayProps) => {
    const { theme } = useTheme();
    const router = useRouter();
    const animationValue = useRef(new Animated.Value(0)).current;

    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const { data: searchResults, isLoading, isError, isDebouncing } = useSearchThreads(searchQuery);
    const postResults: Post[] = Array.isArray(searchResults) ? searchResults : (searchResults?.posts ?? []);

    useEffect(() => {
        const loadSearchHistory = async () => {
            try {
                const cachedHistory = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
                if (cachedHistory) {
                    setRecentSearches(JSON.parse(cachedHistory));
                }
            } catch (error) {
                console.error('Error loading search history:', error);
            }
        };
        loadSearchHistory();
    }, []);

    const handleOnClearHistoryItem = async (itemToRemove: string) => {
        try {
            const updatedHistory = recentSearches.filter((item) => item !== itemToRemove);
            setRecentSearches(updatedHistory);
            await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Error clearing search history:', error);
        }
    };

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: isSearchActive ? 1 : 0,
            duration: isSearchActive ? 300 : 250,
            useNativeDriver: true,
        }).start();
    }, [isSearchActive, animationValue]);

    const translateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SCREEN_WIDTH * 0.1, 0] 
    });


    return (
        <Animated.View 
            style={[styles.overlay, { backgroundColor: theme.colors.background, opacity: animationValue }]}
            pointerEvents={isSearchActive ? 'auto' : 'none'}
        >
            <SafeAreaView edges={['bottom']} style={styles.safeArea}>
                <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>
                    {searchQuery.length === 0 ? (
                        <View style={[styles.suggestions]}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                                Recent
                            </Text>
                            <FlashList
                                data={recentSearches}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        style={styles.historyItem}
                                        activeOpacity={70}
                                        onPress={() => onHistoryPress?.(item)}
                                        >
                                        <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
                                        <Text style={[styles.historyText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                                            {item}
                                        </Text>
                                        <TouchableOpacity style={styles.clearBtnHistory} onPress={(e) => {
                                            e.stopPropagation();
                                            handleOnClearHistoryItem(item);
                                        }}>
                                            <Ionicons name="close" size={18} color={theme.colors.textSecondary}/>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ paddingBottom: 16 }}
                            />
                        </View>
                    ) : (
                        <View style={styles.resultsContainer}>
                            {(isLoading || isDebouncing) ? (
                                <View style={styles.centerContent}>
                                    <Text style={[styles.searchingText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                                        Memindai arsip untuk "{searchQuery}"...
                                    </Text>
                                </View>
                            ) : isError ? (
                                <View style={styles.centerContent}>
                                    <Text style={[styles.errorText, { color: theme.colors.error, fontFamily: theme.fonts.openSans }]}>
                                        Failed to load search results. Please try again later.
                                    </Text>
                                </View>
                            ) : postResults.length === 0 ? (
                                <View style={styles.centerContent}>
                                    <Text style={[styles.emptyText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                                        No discussions found for "{searchQuery}"
                                    </Text>
                                </View>
                            ) : (
                                <FlashList<Post>
                                    data={postResults}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <SearchResultItem
                                            item={item}
                                            resultType="post"
                                            onPress={() => {
                                                router.push({
                                                    pathname: '/threads/[id]',
                                                    params: { id: item.id }
                                                });
                                            }}
                                        />
                                    )}
                                    contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
                                    keyboardDismissMode="on-drag"
                                />
                            )}
                        </View>
                    )}
                </Animated.View>
            </SafeAreaView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    overlay: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 10 },
    content: { 
        flex: 1, 
        padding: 16 
    },
    suggestions: { 
        flex: 1 
    },
    sectionTitle: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        marginBottom: 16 
    },
    historyItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 10, 
        gap: 12 
    },
    historyText: { 
        flex: 1, 
        fontSize: 16 
    },
    clearBtnHistory: { 
        padding: 4 
    },
    trendingItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 12, 
        gap: 12 
    },
    results: { 
        flex: 1, 
        padding: 8, 
        alignItems: 'center' 
    },
    resultsContainer: {
        flex: 1,
        width: '100%',
    },
    searchingText: { 
        fontSize: 14, 
        fontStyle: 'italic', 
        textAlign: 'center' 
    },
    resultList: { 
        gap: 12, 
        marginTop: 24, 
        width: '100%' 
    },
    resultCard: { 
        padding: 16, 
        borderRadius: 12,
        // gap: 8,
        marginBottom: 12,
    },
    resultCardMeta: { 
        flexDirection: 'row', 
        gap: 12 
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    resultContent: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
    },
    emptyText: { 
        textAlign: 'center', 
        marginTop: 32, 
        fontSize: 14 
    },
    errorText: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 32,
    }
});