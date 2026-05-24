// src/components/lists/ReplyItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import VoteButton from '@/components/buttons/voteButton';
import { ThreadComment } from '@/models/user';

interface ReplyItemProps {
    reply: ThreadComment;
}

export default function ReplyItem({ reply }: ReplyItemProps) {
    const { theme } = useTheme();
    const authorName = reply.user.isAnonymous ? 'anonymous' : reply.user.name;

    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                    {reply.content && reply.content.length > 0 && (
                        <View style={[styles.threadLine, { backgroundColor: theme.colors.textSecondary + '22' }]} />
                    )}
                </View>

            <View style={styles.replyContainer}>
                <View style={styles.header}>
                    <Text style={[styles.author, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                        {authorName}
                    </Text>
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>• {reply.createdAt}</Text>
                </View>

                <Text style={[styles.text, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                    {reply.content}
                </Text>

                {reply.image && (
                    <Image source={{ uri: reply.image }} style={styles.replyImage} resizeMode="contain" />
                )}

                <View style={styles.actions}>
                    <VoteButton initialVotes={reply.votes} />
                    {/* Kalau mau tambah sampai level 3, bisa tambah reply lagi disini */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        marginTop: 12 
    },
    replyContainer: { 
        flex: 1 
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6, 
        marginBottom: 4 
    },
    author: { 
        fontSize: 13, 
        fontWeight: 'bold' 
    },
    metaText: { 
        fontSize: 11 
    },
    text: { 
        fontSize: 13, 
        lineHeight: 18,
        marginBottom: 6 
    },
    actions: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 12 
    },
    leftColumn: { 
        alignItems: 'center', 
        marginRight: 8, 
        width: 10 
    },
    threadLine: { 
        width: 2, 
        flex: 1,
        marginTop: 4, 
        borderRadius: 1 
    },
    replyImage: { 
        width: '100%', 
        height: 180, 
        borderRadius: 8, 
        marginBottom: 8 
    },
});