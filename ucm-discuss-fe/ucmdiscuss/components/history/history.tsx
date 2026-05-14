import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserHistory } from '@/models/user';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const HistoryCard = ({ item }: { item: UserHistory }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background, borderBottomColor: theme.colors.textSecondary + '33' }]}>
            <View style={styles.header}>
                <Text style={[styles.time, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                    {item.createdAt}
                </Text>
                <View style={[styles.badge, { backgroundColor: theme.colors.lightSecondary + '22' }]}>
                    <Text style={[styles.badgeText, { color: theme.colors.secondary }]}>
                        {item.type.toUpperCase()}
                    </Text>
                </View>
            </View>
            
            {item.type === 'post' ? (
                // Post
                <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                    {item.title}
                </Text>
            ) : (
                // Comment
                <View>
                    <Text style={[styles.contextText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                        Commented on: <Text style={{ fontStyle: 'italic' }}>{item.parentPostTitle}</Text>
                    </Text>
                    <Text style={[styles.content, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                        {item.content}
                    </Text>
                </View>
            )}

            {/* Stats */}
            <View style={styles.footer}>
                <View style={styles.iconGroup}>
                    <Ionicons name="thumbs-up-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>{item.votesCount}</Text>
                </View>
                <View style={styles.iconGroup}>
                    <Ionicons name="chatbubble-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>{item.commentCount}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        padding: 16, 
        borderBottomWidth: 0.5 
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 12 
    },
    time: { 
        fontSize: 12 
    },
    badge: { 
        paddingHorizontal: 8, 
        paddingVertical: 2, 
        borderRadius: 12 
    },
    badgeText: { 
        fontSize: 10, 
        fontWeight: 'bold' 
    },
    title: { 
        fontSize: 16, 
        lineHeight: 22, 
        marginBottom: 12 
    },
    contextText: { 
        fontSize: 12, 
        marginBottom: 4 
    },
    content: { 
        fontSize: 14, 
        lineHeight: 20, 
        marginBottom: 12 
    },
    footer: { 
        flexDirection: 'row', 
        gap: 16 
    },
    iconGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 4 
    },
    footerText: { 
        fontSize: 12 
    }
});