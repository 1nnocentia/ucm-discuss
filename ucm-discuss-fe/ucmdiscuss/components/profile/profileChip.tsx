// src/components/profile/ProfileChip.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ProfileChipProps {
    faculty: string;
    major: string;
}

export const ProfileChip = ({ faculty, major }: ProfileChipProps) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.chip]}>
            <Text style={[styles.text, { color: theme.colors.secondary, fontFamily: theme.fonts.openSans }]}>
                {faculty} - {major}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chip: {
        // paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        // marginRight: 4,
        marginTop: 8,
    },
    text: { 
        fontSize: 12, 
        fontWeight: '600' 
    },
});