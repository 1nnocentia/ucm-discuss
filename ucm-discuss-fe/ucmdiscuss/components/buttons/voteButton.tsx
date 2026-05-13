import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

interface VoteButtonProps {
    initialVotes: number;
    initialIsVoted?: boolean;
    onVote?: (isVoted: boolean) => void;
}

export default function VoteButton({ initialVotes, initialIsVoted = false, onVote }: VoteButtonProps) {
    const { theme } = useTheme();
    const [isVoted, setIsVoted] = useState(initialIsVoted);
    const [votes, setVotes] = useState(initialVotes);

    const handleVote = () => {
        const newVotedState = !isVoted;
        setIsVoted(newVotedState);
        setVotes(prev => newVotedState ? prev + 1 : prev - 1);
        
        if (onVote) onVote(newVotedState);
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