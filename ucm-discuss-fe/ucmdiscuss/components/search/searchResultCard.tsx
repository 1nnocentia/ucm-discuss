import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export type SearchResultType = 'post' | 'topic' | 'user';

interface SearchResultCardProps {
    type: SearchResultType;
    title: string;
    snippet?: string | null;
    metadata?: string;
    onPress: () => void;
}

export default function SearchResultCard({ 
    type, 
    title, 
    snippet, 
    metadata, 
    onPress 
}: SearchResultCardProps) {
    const { theme } = useTheme();

    const getIconConfig = () => {
        switch (type) {
            case 'topic': 
                return { name: 'book-outline' as const, color: theme.colors.primary };
            case 'user': 
                return { name: 'person-outline' as const, color: theme.colors.textSecondary };
            case 'post':
            default: 
                return { name: 'document-text-outline' as const, color: theme.colors.textPrimary };
        }
    };

    const iconConfig = getIconConfig();

    return (
        <TouchableOpacity 
            style={[
                styles.container, 
                { borderBottomColor: theme.colors.textSecondary + '20' }
            ]} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Ikon Kiri */}
            <View style={[styles.iconWrapper, { backgroundColor: theme.colors.textSecondary + '11' }]}>
                <Ionicons name={iconConfig.name} size={20} color={iconConfig.color} />
            </View>

            {/* Konten Utama */}
            <View style={styles.contentContainer}>
                <Text 
                    style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]} 
                    numberOfLines={1}
                >
                    {title}
                </Text>
                
                {snippet && (
                    <Text 
                        style={[styles.snippet, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]} 
                        numberOfLines={1}
                    >
                        {snippet}
                    </Text>
                )}
                
                {metadata && (
                    <Text style={[styles.metadata, { color: theme.colors.textSecondary }]}>
                        {metadata}
                    </Text>
                )}
            </View>

            <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary + '50'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contentContainer: {
        flex: 1,
        marginRight: 8,
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    snippet: {
        fontSize: 13,
        marginBottom: 4,
    },
    metadata: {
        fontSize: 11,
    }
});