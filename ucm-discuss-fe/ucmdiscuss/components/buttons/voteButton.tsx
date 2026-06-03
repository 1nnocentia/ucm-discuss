import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useAuth } from '@/context/AuthContext';
import { ApiService } from '@/controllers/services/apiService';

interface VoteButtonProps {
    initialVotes: number;
    initialIsVoted?: boolean;
    onVote?: (isVoted: boolean) => void;
    targetId?: string;
    type?: 'post' | 'comment';
}

export default function VoteButton({ 
    initialVotes, 
    initialIsVoted = false, 
    onVote,
    targetId,
    type
}: VoteButtonProps) {
    const { theme } = useTheme();
    const { updateLocalVotesCount } = useAuth();
    const [isVoted, setIsVoted] = useState(initialIsVoted);
    const [votes, setVotes] = useState(initialVotes);

    useEffect(() => {
        setIsVoted(initialIsVoted);
    }, [initialIsVoted]);

    useEffect(() => {
        setVotes(initialVotes);
    }, [initialVotes]);

    const handleVote = async () => {
        const newVotedState = !isVoted;
        
        // Optimistic UI updates
        setIsVoted(newVotedState);
        setVotes(prev => newVotedState ? prev + 1 : prev - 1);
        if (updateLocalVotesCount) {
            updateLocalVotesCount(newVotedState);
        }
        
        if (onVote) onVote(newVotedState);

        // API Call
        if (targetId && type) {
            try {
                if (type === 'post') {
                    await ApiService.votePost(targetId, newVotedState);
                } else if (type === 'comment') {
                    await ApiService.voteComment(targetId, newVotedState);
                }
            } catch (error) {
                console.error(`Failed to vote ${type}:`, error);
                // Rollback if error
                setIsVoted(!newVotedState);
                setVotes(prev => !newVotedState ? prev + 1 : prev - 1);
                if (updateLocalVotesCount) {
                    updateLocalVotesCount(!newVotedState);
                }
            }
        }
    };


    return (
        <TouchableOpacity style={styles.iconGroup} onPress={handleVote} activeOpacity={0.7}>
            <Ionicons 
                name={isVoted ? "thumbs-up" : "thumbs-up-outline"} 
                size={16} 
                color={isVoted ? theme.colors.primary : theme.colors.textSecondary} 
            />
            <Text style={[styles.footerText, { 
                color: isVoted ? theme.colors.primary : theme.colors.textSecondary,
                fontFamily: theme.fonts.openSans
            }]}>
                {votes}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 4 
    },
    footerText: { 
        fontSize: 12 
    }
})