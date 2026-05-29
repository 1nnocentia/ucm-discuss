import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { TopicsData } from '@/models/user';


interface TopicListItemProps {
    topic: TopicsData;
    onPress: () => void;
}

export default function TopicListItem({ topic, onPress }: TopicListItemProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity 
            style={[styles.container, { borderBottomColor: theme.colors.textSecondary + '33' }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconBox, { backgroundColor: theme.colors.lightSecondary + '22' }]}>
                <Ionicons name="library" size={20} color={theme.colors.secondary} />
            </View>
            
            <View style={styles.content}>
                <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                    {topic.name}
                </Text>
                <Text style={[styles.description, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]} numberOfLines={2}>
                    {topic.description}
                </Text>
                <Text style={[styles.meta, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                    {topic.discussionCount} discussions
                </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary + '88'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    content: { 
        flex: 1, 
        paddingRight: 16 
    },
    title: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 4 
    },
    description: { 
        fontSize: 13, 
        lineHeight: 18, 
        marginBottom: 6 
    },
    meta: { 
        fontSize: 12, 
        fontWeight: '600' 
    }
});