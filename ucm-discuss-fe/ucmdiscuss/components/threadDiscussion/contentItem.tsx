// src/components/lists/CommentItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import VoteButton from '@/components/buttons/voteButton';
import ReplyItem from '@/components/threadDiscussion/replyItem';
import ZoomableImage from '@/components/common/zoomableImage';
import { ThreadComment } from '@/models/user';

interface CommentItemProps {
    comment: ThreadComment;
    onReplyPress: (commentId: string, imageUri: string | null) => void;
}

export default function CommentItem({ comment, onReplyPress }: CommentItemProps) {
    const { theme } = useTheme();
    const authorName = comment.user.isAnonymous ? 'anonymous' : comment.user.name;

    return (
        <View style={[styles.container, { borderBottomColor: theme.colors.textSecondary + '11' }]}>
            
            <View style={styles.mainCommentRow}>
                <View style={styles.rightColumn}>
                    <View style={styles.header}>
                        <Text style={[styles.author, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                            {authorName}
                        </Text>
                        <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>• {comment.createdAt}</Text>
                    </View>

                    {comment.image && (
                        <ZoomableImage
                            uri={comment.image}
                            style={styles.commentImage}
                            resizeMode="contain"
                        />
                    )}

                    <Text style={[styles.text, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                        {comment.content}
                    </Text>

                    <View style={styles.actions}>
                        <VoteButton initialVotes={comment.votes} />
                        <TouchableOpacity onPress={() => onReplyPress(comment.id, null)} style={styles.replyBtn}>
                            <Text style={[styles.replyBtnText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                                Reply
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {comment.replies && comment.replies.length > 0 && (
                <View style={styles.repliesContainer}>
                    {comment.replies.map(reply => (
                        <ReplyItem key={reply.id} reply={reply} />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        paddingHorizontal: 16,
        paddingVertical: 12, 
        borderBottomWidth: 0.5,
        flex: 1
    },
    mainCommentRow: { 
        flexDirection: 'row' 
    },
    
    rightColumn: { 
        flex: 1 
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8,
        marginBottom: 4 
        },
    author: { 
        fontSize: 14, 
        fontWeight: 'bold' 
    },
    metaText: { 
        fontSize: 12 
    },
    text: { 
        fontSize: 14,
        lineHeight: 20, 
        marginBottom: 8 
    },
    commentImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
    },
    
    actions: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 16 
    },
    replyBtn: { 
        paddingVertical: 4 
    },
    replyBtnText: { 
        fontSize: 13, 
        fontWeight: '600' 
    },

    repliesContainer: { 
        marginLeft: 30,
        marginTop: 4 
    }
});