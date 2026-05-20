import { useSearch } from "@/context/SearchContext";
import { useTheme } from "@/context/ThemeContext";
import { useDebounce } from "@/controllers/hooks/useDebounce";

import { View, Text, Alert, TouchableOpacity } from "react-native";
import { AnimatedSearchOverlay } from "@/components/search/animatedSearchOverlay";
import HomePostCard from "@/components/threadCard/homePostCard";
import { useFocusEffect, useRouter } from "expo-router";
import { Post } from "@/models/user";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { usePendingUploads } from "@/context/PendingUploadsContext";
import { Ionicons } from "@expo/vector-icons";
import { ApiService } from "@/controllers/services/apiService";

export default function homeScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const { localPosts, markPostPublished, markPostRetryable, removeLocalPost } = usePendingUploads();

    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [now, setNow] = useState(Date.now());

    const fetchPostsData = async (): Promise<Post[]> => {
        return ApiService.getPosts();
    };

    useEffect(() => {
        if (localPosts.length === 0) {
            return;
        }

        const intervalId = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [localPosts.length]);

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

    const feedPosts = useMemo(() => {
        const pendingLocalPosts = localPosts
            .filter((post) => post.syncStatus === 'pending')
            .sort((left, right) => right.createdAtTimestamp - left.createdAtTimestamp);

        const publishedLocalPosts = localPosts.filter((post) => post.syncStatus === 'published');

        const sortByHomeRanking = (items: Post[]) => {
            return [...items].sort((left, right) => {
                // Saat ini masih mempertahankan urutan default untuk feed non-pending.
                // Ganti blok ini dengan ranking algorithm Anda saat backend sudah siap.
                return 0;
            });
        };

        return [...pendingLocalPosts, ...sortByHomeRanking([...publishedLocalPosts, ...posts])];
    }, [localPosts, posts]);

    const pendingBannerPost = useMemo(() => {
        return localPosts.find((post) => post.syncStatus === 'pending');
    }, [localPosts]);

    const pendingBannerCanRetry = pendingBannerPost ? pendingBannerPost.retryAvailableAt <= now : false;
    const pendingBannerRetryInSeconds = pendingBannerPost
        ? Math.max(0, Math.ceil((pendingBannerPost.retryAvailableAt - now) / 1000))
        : 0;

    const handleRetryPost = async (postId: string) => {
        const target = localPosts.find((post) => post.id === postId);

        if (!target) {
            return;
        }

        if (target.retryAvailableAt > now) {
            Alert.alert("Tunggu dulu", "Retry baru bisa dipakai setelah beberapa saat.");
            return;
        }

        try {
            // await createThreadUpload(target.title, target.description ?? '', target.image);
            await markPostPublished(target.id);
            Alert.alert("Upload berhasil", "Thread sudah berhasil dikirim.");
        } catch (error) {
            await markPostRetryable(target.id, error instanceof Error ? error.message : 'Upload gagal');
            Alert.alert("Upload gagal", "Masih belum bisa terkirim. Silakan coba lagi nanti.");
        }
    };

    const handleCancelRetry = async (postId: string) => {
        Alert.alert(
            "Cancel Upload",
            "Are you sure you want to cancel this upload? This action cannot be undone.",
            [
                {text: "No", style: "cancel"},
                {text: "Yes", style: "destructive", onPress: async () => {
                    try {
                        await removeLocalPost(postId);
                        Alert.alert("Upload cancelled", "The pending thread has been removed.");
                    } catch (error) {
                        Alert.alert("Cancellation failed", "Failed to remove the pending thread. Please try again.");
                    }
                }}
            ]
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {pendingBannerPost && (
                <View
                    style={[
                        styles.pendingBanner,
                        {
                            backgroundColor: theme.colors.warning + '10',
                            borderColor: theme.colors.warning + '25',
                        },
                    ]}
                >
                    <View style={styles.pendingBannerLeft}>
                        {/* <View style={[styles.pendingDot, { backgroundColor: theme.colors.warning }]} /> */}
                        <TouchableOpacity onPress={() => handleCancelRetry(pendingBannerPost.id)}>
                            <Ionicons name="close-circle" size={16} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                        <Text style={[styles.pendingBannerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                            Uploading ...
                        </Text>
                    </View>

                    {pendingBannerCanRetry ? (
                        <TouchableOpacity
                            style={[styles.pendingBannerRetry, { backgroundColor: theme.colors.warning }]}
                            onPress={() => handleRetryPost(pendingBannerPost.id)}
                            activeOpacity={0.85}
                        >
                            <Text style={[styles.pendingBannerRetryText, { color: '#fff' }]}>Retry</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={[styles.pendingBannerHint, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                            Retry in {pendingBannerRetryInSeconds}s
                        </Text>
                    )}
                </View>
            )}

            <FlashList 
                data={feedPosts}
                keyExtractor={(item) => item.id}
                maintainVisibleContentPosition={{ 
                    autoscrollToTopThreshold: 50,
                 }}
                renderItem={({ item }) => (
                    <HomePostCard
                        post={item}
                        onPress={() => {
                            const localPost = localPosts.find((post) => post.id === item.id);

                            if (localPost) {
                                Alert.alert(
                                    localPost.syncStatus === 'published' ? 'Thread lokal' : 'Thread masih upload',
                                    localPost.syncStatus === 'published'
                                        ? 'Thread ini dibuat dari draft lokal.'
                                        : 'Thread ini sudah tampil di home dan sedang menunggu upload selesai.'
                                );
                                return;
                            }

                            router.push(`/threads/${item.id}`);
                        }}
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

const styles = {
    pendingBanner: {
        marginHorizontal: 16,
        marginTop: 10,
        marginBottom: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 14,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        gap: 12,
    },
    pendingBannerLeft: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: 8,
        flexShrink: 1,
    },
    pendingDot: {
        width: 8,
        height: 8,
        borderRadius: 999,
    },
    pendingBannerTitle: {
        fontSize: 12,
        fontWeight: '700' as const,
    },
    pendingBannerHint: {
        fontSize: 11,
        fontWeight: '600' as const,
    },
    pendingBannerRetry: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
    },
    pendingBannerRetryText: {
        fontSize: 11,
        fontWeight: '700' as const,
    },
};