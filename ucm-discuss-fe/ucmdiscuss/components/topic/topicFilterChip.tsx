import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { FilterType } from '@/models/user';


interface FilterChipsProps {
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export default function TopicFilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
    const { theme } = useTheme();

    const filters: { label: string, value: FilterType }[] = [
        { label: 'All', value: 'all' },
        { label: 'Current', value: 'current' },
        { label: 'Past', value: 'past' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {filters.map((filter) => {
                    const isActive = activeFilter === filter.value;
                    return (
                        <TouchableOpacity
                            key={filter.value}
                            style={[
                                styles.chip,
                                { 
                                    backgroundColor: isActive ? theme.colors.primary : theme.colors.textSecondary + '22',
                                    borderColor: isActive ? theme.colors.primary : 'transparent'
                                }
                            ]}
                            onPress={() => onFilterChange(filter.value)}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.chipText,
                                { 
                                    // Teks gelap jika chip aktif (background Primary), terang jika tidak
                                    color: isActive ? '#121212' : theme.colors.textPrimary,
                                    fontFamily: theme.fonts.montserrat 
                                }
                            ]}>
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        paddingVertical: 12 
    },
    scrollContent: { 
        paddingHorizontal: 16, 
        gap: 12 
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    chipText: { 
        fontSize: 13, 
        fontWeight: '600' 
    }
});