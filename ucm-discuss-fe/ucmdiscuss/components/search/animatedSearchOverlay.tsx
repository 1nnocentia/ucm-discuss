import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SearchOverlayProps {
    isSearchActive: boolean;
    searchQuery: string;
}

export const AnimatedSearchOverlay = ({ isSearchActive, searchQuery }: SearchOverlayProps) => {
    const { theme } = useTheme();
    const animationValue = useRef(new Animated.Value(0)).current;

    const recentSearches = ['Software Engineering', 'AI trends', 'Mobile-App Development'];

    useEffect(() => {
        if (isSearchActive) {
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animationValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [isSearchActive]);

    const translateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SCREEN_WIDTH * 0.1, 0] 
    });

    return (
        <Animated.View 
            style={[styles.overlay, { backgroundColor: theme.colors.background, opacity: animationValue }]}
            pointerEvents={isSearchActive ? 'auto' : 'none'}
        >
            <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
                <Animated.View style={[styles.content, { transform: [{ translateY }] }]}>
                    {searchQuery.length === 0 ? (
                        <View style={styles.suggestions}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                                Recent
                            </Text>
                            <FlatList 
                                data={recentSearches}
                                renderItem={({ item }) => (
                                    <View style={styles.historyItem}>
                                        <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
                                        <Text style={[styles.historyText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                                            {item}
                                        </Text>
                                        <TouchableOpacity style={styles.clearBtnHistory}>
                                            <Ionicons name="close" size={18} color={theme.colors.textSecondary}/>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ paddingBottom: 16 }}
                            />
                        </View>
                    ) : (
                        <View style={styles.results}>
                            <Text style={[styles.searchingText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                                Searching for "{searchQuery}"...
                            </Text>
                            
                            {/* Placeholder search */}
                            {/* <View style={styles.resultList}>
                                {[1, 2].map(id => (
                                    <View key={id} style={[styles.resultCard, { backgroundColor: theme.colors.textSecondary + '11' }]}>
                                        <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold' }}>Mock post related to "{searchQuery}"</Text>
                                        <Text style={{ color: theme.colors.textSecondary }}>...short snippet containing "{searchQuery}"...</Text>
                                        <View style={styles.resultCardMeta}>
                                            <Text style={{ color: theme.colors.secondary, fontSize: 10 }}>#Topic</Text>
                                            <Text style={{ color: theme.colors.textSecondary, fontSize: 10 }}>23 votes</Text>
                                        </View>
                                    </View>
                                ))}
                            </View> */}
                        </View>
                    )}
                </Animated.View>
            </SafeAreaView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 10 },
    content: { 
        flex: 1, 
        padding: 16 
    },
    suggestions: { 
        flex: 1 
    },
    sectionTitle: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        marginBottom: 16 
    },
    historyItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 10, 
        gap: 12 
    },
    historyText: { 
        flex: 1, 
        fontSize: 16 
    },
    clearBtnHistory: { 
        padding: 4 
    },
    trendingItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 12, 
        gap: 12 
    },
    // trendingText: { 
    //     fontSize: 16, 
    //     fontWeight: '500' 
    // },
    // trendingSubText: { 
    //     fontSize: 12, 
    //     marginTop: 2 
    // },
    results: { 
        flex: 1, 
        padding: 8, 
        alignItems: 'center' 
    },
    searchingText: { 
        fontSize: 14, 
        fontStyle: 'italic', 
        textAlign: 'center' 
    },
    resultList: { 
        gap: 12, 
        marginTop: 24, 
        width: '100%' 
    },
    resultCard: { 
        padding: 16, 
        borderRadius: 12,
        gap: 8 
    },
    resultCardMeta: { 
        flexDirection: 'row', 
        gap: 12 
    },
});