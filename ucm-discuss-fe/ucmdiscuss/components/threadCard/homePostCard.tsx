import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Post } from '@/models/user';
import VoteButton from '../buttons/voteButton';
import CommentButton from '../buttons/commentButton';
import { useRouter } from 'expo-router';

interface HomePostCardProps {
    post: Post;
    onPress: () => void;
}

export default function HomePostCard({ post, onPress }: HomePostCardProps) {
    const { theme } = useTheme();
    const router = useRouter();

    const { isAnonymous, name } = post.user;
    const authorName = isAnonymous ? 'anonymous' : name;
    
    const handleCommentAction = () => {
        if (onPress) {
            onPress();
        } else {
            router.push({
                pathname: '/threads/[id]',
                params: { id: post.id, focusInput: 'true' }
            });
        }
    };

    return (
        <TouchableOpacity 
            style={[styles.card, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.textSecondary + '33' }]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Header: User, Time, Topic */}
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

            {/* Body: Title, Content, (Optional Image) */}
            <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                {post.title}
            </Text>
            
            {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
            )}

            {post.description && (
                <Text 
                    style={[styles.description, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}
                    numberOfLines={3}
                >
                    {post.description}
                </Text>
            )}

            {/* Footer: Votes & Comments */}
            <View style={styles.footer}>
                <VoteButton initialVotes={post.votes} initialIsVoted={post.userVoteStatus} />
                
                <View style={styles.commentGroup}>
                    <CommentButton post={post} onPress={() => {}} />
                </View>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { 
        padding: 16, 
        borderBottomWidth: 1 
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginBottom: 8 
    },
    headerLeft: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 2,
        flexWrap: 'wrap'
    },
    author: { 
        fontSize: 14, 
        fontWeight: 'bold' 
    },
    meta: { 
        fontSize: 12 
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
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 8, 
        lineHeight: 24 
    },
    postImage: { 
        width: '100%', 
        height: 180, 
        borderRadius: 8, 
        marginBottom: 8 
    },
    description: { 
        fontSize: 14, 
        lineHeight: 20, 
        marginBottom: 12 
    },
    footer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 16,
        flexWrap: 'wrap' 
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