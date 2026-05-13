import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { NotificationProps } from '@/models/user';

export default function NotificationCard({ item, onPress }: { item: NotificationProps, onPress: () => void }) {
    const { theme } = useTheme();

    const getActionText = () => {
        switch (item.actionType) {
            case 'reply_post': return 'replied to your post';
            case 'reply_comment': return 'replied to your comment';
            case 'vote': return 'voted on your post';
            default: return 'interacted with you';
        }
    };

    const getIcon = () => {
        if (item.actionType === 'vote') return "arrow-up-circle";
        return "chatbubble-ellipses";
    };

    return (
        <TouchableOpacity 
            style={[
                styles.container, 
                { 
                    backgroundColor: item.isRead ? theme.colors.background : theme.colors.lightSecondary + '11',
                    borderBottomColor: theme.colors.textSecondary + '33' 
                }
            ]}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={getIcon()} size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={[styles.mainText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                    <Text style={{ fontWeight: 'bold', fontFamily: theme.fonts.montserrat }}>{item.actorName}</Text> {getActionText()}
                </Text>
                <Text style={[styles.snippetText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]} numberOfLines={1}>
                    "{item.targetSnippet}"
                </Text>
                <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>{item.createdAt}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        padding: 16, 
        borderBottomWidth: 1 
    },
    iconContainer: { 
        marginRight: 16, 
        marginTop: 2 
    },
    contentContainer: { 
        flex: 1 
    },
    mainText: { 
        fontSize: 14, 
        marginBottom: 4 
    },
    snippetText: { 
        fontSize: 13, 
        fontStyle: 'italic', 
        marginBottom: 6 
    },
    timeText: { 
        fontSize: 11 
    }
});