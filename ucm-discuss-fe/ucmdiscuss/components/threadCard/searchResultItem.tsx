import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '@/models/user';

interface SearchResultItemProps {
    item: Post;
    resultType?: 'post' | 'comment'; 
    onPress: () => void;
}

export default function SearchResultItem({ item, resultType = 'post', onPress }: SearchResultItemProps) {
    const { theme } = useTheme();

    const isAnon = item.user.isAnonymous;

    let authorName: string;

    if (isAnon === true) {
        authorName = "Anonymous";
    } else {
        authorName = item.user.name;
    }

    const getIcon = () => {
        return resultType === 'post' ? 'document-text-outline' : 'chatbubble-outline';
    };

    return (
        <TouchableOpacity 
            style={[
                styles.container, 
                { 
                    backgroundColor: theme.colors.background,
                    borderBottomColor: theme.colors.textSecondary + '25',
                }
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={getIcon()} size={20} color={theme.colors.textSecondary} />
            </View>
            
            <View style={styles.contentContainer}>
                {item.title && (
                    <Text 
                        style={[styles.titleText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]} 
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                )}
                
                <Text 
                    style={[styles.snippetText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]} 
                    numberOfLines={2} 
                >
                    {item.description}
                </Text>
                
                <View style={styles.metaContainer}>
                    <Text style={[styles.metaText, { color: theme.colors.primary }]}>
                        {authorName}
                    </Text>
                    <View style={[styles.dot, { backgroundColor: theme.colors.textSecondary + '50' }]} />
                    <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                        {item.createdAt} 
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        paddingVertical: 12,    
        paddingHorizontal: 16, 
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    iconContainer: { 
        marginRight: 14, 
        marginTop: 2
    },
    contentContainer: { 
        flex: 1,
        gap: 4
    },
    titleText: { 
        fontSize: 15, 
        fontWeight: '600',
    },
    snippetText: { 
        fontSize: 14, 
        lineHeight: 20,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    metaText: { 
        fontSize: 12,
        fontFamily: 'OpenSans',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginHorizontal: 6,
    }
});