import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import HomeThreadCard from '@/components/threadCard/detailedThreadCard';
import { Post, TopicsData } from '@/models/user';
import { ApiService } from '@/controllers/services/apiService';
import HomePostCard from '@/components/threadCard/homePostCard';
import Header from '@/components/header/header';

const TopicHeader = ({ 
    topicInfo, 
    topicStats,
}: { 
    topicInfo: TopicsData | null;
    topicStats: { discussionCount: number } | null;
}) => {
    const { theme } = useTheme();
    
    if (!topicInfo) return null;

    return (
            <View style={[styles.infoArea, { backgroundColor: theme.colors.lightSecondary + '44' }]}>
                <Text style={[styles.topicTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                    c/{topicInfo.name}
                </Text>

                <Text style={[styles.statsText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                    <Text style={{ fontWeight: 'bold' }}>{topicStats?.discussionCount ?? 0}</Text> Discussions
                </Text>

                <Text style={[styles.description, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                    {topicInfo.description}
                </Text>
            </View>
    );
};

export default function TopicDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme } = useTheme();
    const [topicInfo, setTopicInfo] = useState<TopicsData | null>(null);
    const [topicStats, setTopicStats] = useState<{ discussionCount: number } | null>(null);
    const [topicPosts, setTopicPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const topicId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const topics = await ApiService.getTopics();
                const topic = topics?.find((t: TopicsData) => t.id === topicId) || topics?.[0];
                
                if (!topic) {
                    throw new Error('Topic not found');
                }

                setTopicInfo(topic);

                const [stats, posts] = await Promise.all([
                    ApiService.getTopics(),
                    ApiService.getPosts()
                ]);

                setTopicStats(stats);
                const filtered = (posts || []).filter((p: Post) => p.topic?.id === topic.id);
                setTopicPosts(filtered);
            } catch (err) {
                setError('Failed to load topic data');
                console.error('Topic data error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [topicId]);

    const handleThreadPress = useCallback((itemId: string) => {
        router.push(`/threads/${itemId}`);
    }, [router]);

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} style={styles.centerLoader} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: theme.colors.textPrimary }]}>
                        {error}
                    </Text>
                    <TouchableOpacity 
                        style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.retryButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <Header title={topicInfo ? `c/${topicInfo.name}` : 'Topic'} />
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <FlashList
                    data={topicPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HomePostCard post={item} onPress={() => handleThreadPress(item.id)} />
                    )}
                ListHeaderComponent={
                    <TopicHeader 
                    topicInfo={topicInfo} 
                    topicStats={topicStats} />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
            </View>
        </SafeAreaView>        
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: { 
        flex: 1 
    },
    centerLoader: {
        marginTop: '20%'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 14,
    },
    headerContainer: {
        marginBottom: 4,
    },
    infoArea: {
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    topicTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    statsText: {
        fontSize: 14,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
    },
});