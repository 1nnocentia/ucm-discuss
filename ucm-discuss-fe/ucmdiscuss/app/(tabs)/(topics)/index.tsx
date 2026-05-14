import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/header/header';
import { FilterType } from '@/models/user';
import TopicFilterChips from '@/components/topic/topicFilterChip';
import { TopicsDummyData } from '@/constants/dummyData/dummyData';
import TopicListItem from '@/components/topic/topicListItem';

export default function TopicsScreen() {
    const { theme } = useTheme();
    const [activeFilter, setActiveFilter] = useState<FilterType>('current');

    const filteredTopics = TopicsDummyData.filter((topic) => {
        if (activeFilter === 'all') return true;
        return topic.status === activeFilter;
    });

    const handleTopicPress = (topicId: string) => {
        console.log(`Navigating to topic: ${topicId}`);
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <Header title="Communities" />

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