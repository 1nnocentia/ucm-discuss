import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserHistory } from '@/models/user';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import VoteButton from '../buttons/voteButton';
import CommentButton from '../buttons/commentButton';

export const HistoryCard = ({ item }: { item: UserHistory }) => {
    const { theme } = useTheme();
    const router = useRouter();

    const targetId = item.type === 'post' ? item.id : item.postId;

    const handlePress = () => {
        router.push(`/threads/${targetId}`);
    };

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
            <View style={[styles.container, {backgroundColor: theme.colors.background, borderBottomColor: theme.colors.textSecondary + '33' }]}>
            <View style={styles.header}>
                <Text style={[styles.time, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                    {item.createdAt}
                </Text>
            </View>
            
            {item.type === 'post' ? (
                // Post
                <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
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
                <VoteButton initialVotes={item.votesCount} />
                <CommentButton count={item.commentCount} targetId={targetId} />
            </View>
            </View>
        </TouchableOpacity>
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
        fontSize: 14, 
        lineHeight: 22, 
        marginBottom: 12,
        fontWeight: 'bold'
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