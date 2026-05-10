// src/components/profile/ProfileTabs.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { HistoryCard } from '@/components/history/history';
import { useTheme } from '@/context/ThemeContext';
import { UserHistory } from '@/models/user';

interface ProfileTabsProps {
    data: UserHistory[];
}

export const ProfileTabs = ({ data }: ProfileTabsProps) => {
    const [activeTab, setActiveTab] = useState<'post' | 'comment'>('post');
    const { theme } = useTheme();

    const filteredData = data.filter(item => item.type === activeTab);

    return (
        <View style={[  styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Tab Header */}
            <View style={[styles.tabBar, { borderBottomColor: theme.colors.textSecondary }]}>
                {['post', 'comment'].map((tab) => (
                    <TouchableOpacity 
                        key={tab}
                        onPress={() => setActiveTab(tab as any)}
                        style={[
                            styles.tabItem, 
                            activeTab === tab && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }
                        ]}
                    >
                        <Text style={[
                            styles.tabText, 
                            { color: activeTab === tab ? theme.colors.textPrimary : theme.colors.textSecondary, fontFamily: theme.fonts.montserrat }
                        ]}>
                            {tab.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tab Content */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <HistoryCard item={item} />}
                scrollEnabled={false}
                ListEmptyComponent={<Text style={[styles.empty, { color: theme.colors.textSecondary }]}>No {activeTab} yet.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: '100%' },
    tabBar: { flexDirection: 'row', borderBottomWidth: 1 },
    tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center' },
    tabText: { fontSize: 14 },
    empty: { textAlign: 'center', marginTop: 20, opacity: 0.5 }
});