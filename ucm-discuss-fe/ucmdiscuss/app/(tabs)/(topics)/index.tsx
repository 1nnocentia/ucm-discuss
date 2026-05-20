import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/header/header';
import { FilterType, TopicsData } from '@/models/user';
import TopicFilterChips from '@/components/topic/topicFilterChip';
import TopicListItem from '@/components/topic/topicListItem';
import { ApiService } from '@/controllers/services/apiService';

export default function TopicsScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [activeFilter, setActiveFilter] = useState<FilterType>('current');
    const [topics, setTopics] = useState<TopicsData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTopics();
    }, []);

    const loadTopics = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await ApiService.getTopics();
            setTopics(data || []);
        } catch (err) {
            setError('Failed to load topics');
            console.error('Topics error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredTopics = topics.filter((topic) => {
        if (activeFilter === 'all') return true;
        return topic.status === activeFilter;
    });

    const handleTopicPress = useCallback((topicId: string) => {
        router.push(`/${topicId}`);
    }, [router]);

    if (loading) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
                <Header title="Topics" />
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
                <Header title="Topics" />
                <View style={styles.centerContainer}>
                    <Text style={[styles.errorText, { color: theme.colors.textPrimary }]}>
                        {error}
                    </Text>
                    <TouchableOpacity 
                        style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
                        onPress={loadTopics}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <Header title="Topics" />

            <TopicFilterChips 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
            />

            <FlatList
                data={filteredTopics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TopicListItem 
                        topic={item} 
                        onPress={() => handleTopicPress(item.id)} 
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                            No topics found for this filter.
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1 
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16
    },
    retryButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8
    },
    retryButtonText: {
        color: '#121212',
        fontWeight: 'bold',
        fontSize: 14
    },
    listContent: { 
        paddingBottom: 24 
    },
    emptyState: { 
        padding: 32, 
        alignItems: 'center' 
    },
    emptyText: { 
        fontSize: 14, 
        fontStyle: 'italic' 
    }
});