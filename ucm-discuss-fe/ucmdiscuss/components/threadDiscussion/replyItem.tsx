// src/components/lists/ReplyItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import VoteButton from '@/components/buttons/voteButton';
import { ReplyData } from '@/models/user';

interface ReplyItemProps {
    reply: ReplyData;
}

export default function ReplyItem({ reply }: ReplyItemProps) {
    const { theme } = useTheme();
    const authorName = reply.user.isAnonymous ? 'anonymous' : reply.user.name;

    return (
        <View style={styles.container}>

            <View style={styles.replyContainer}>
                <View style={styles.header}>
                    <Text style={[styles.author, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                        {authorName}
                    </Text>
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>• {reply.createdAt}</Text>
                </View>

                <Text style={[styles.text, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                    {reply.text}
                </Text>

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
});