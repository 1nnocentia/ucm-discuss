// src/components/profile/ProfileChip.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ProfileChipProps {
    label: string;
}

export const ProfileChip = ({ label }: ProfileChipProps) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.chip, { backgroundColor: theme.colors.lightSecondary + '33' }]}>
            <Text style={[styles.text, { color: theme.colors.secondary, fontFamily: theme.fonts.openSans }]}>
                {label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        marginRight: 8,
        marginTop: 8,
    },
    text: { 
        fontSize: 12, 
        fontWeight: '600' 
    },
});