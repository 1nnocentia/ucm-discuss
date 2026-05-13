import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Post } from '@/models/user';
import { Ionicons } from '@expo/vector-icons';
import VoteButton from '../buttons/voteButton';


export default function DetailedThreadCard({ post }: { post: Post }) {
    const { theme } = useTheme();
    const authorName = post.isAnonymous ? 'anonymous' : post.user.name;

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.textSecondary + '33' }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.author, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                        {authorName}
                    </Text>
                    <Text style={[styles.meta, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                        • {post.createdAt}
                    </Text>
                </View>
                <View style={[styles.topicBadge, { backgroundColor: theme.colors.lightSecondary + '22' }]}>
                    <Text style={[styles.topicText, { color: theme.colors.secondary }]}>{post.topic.name}</Text>
                </View>
            </View>

            <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                {post.title}
            </Text>
            
            {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="contain" />
            )}

            {post.description && (
                <Text style={[styles.description, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                    {post.description}
                </Text>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <VoteButton initialVotes={post.votes} initialIsVoted={post.userVoteStatus} />
                
                <View style={styles.commentGroup}>
                    <Ionicons name="chatbubble-outline" size={18} color={theme.colors.textSecondary} />
                    <Text style={[styles.footerText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                        {post.comments}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginBottom: 8 
    },
    headerLeft: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6 
    },
    author: { 
        fontSize: 14, 
        fontWeight: 'bold' 
    },
    meta: { 
        fontSize: 12 
    },
    card: { 
        padding: 16, 
        borderBottomWidth: 1 
    },
    topicBadge: { 
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        borderRadius: 12 
    },
    topicText: { 
        fontSize: 10, 
        fontWeight: 'bold' 
    },
    postImage: { 
        width: '100%', 
        height: 180, 
        borderRadius: 8, 
        marginBottom: 8 
    },
    title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        marginBottom: 12, 
        lineHeight: 28 
    },
    description: { 
        fontSize: 15, 
        lineHeight: 24, 
        marginBottom: 16 
    },
    footer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 16 
    },
    commentGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6 
    },
    footerText: { 
        fontSize: 13, 
        fontWeight: '600' 
    }
});