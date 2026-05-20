import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Topics } from '@/models/user';
import { ApiService } from '@/controllers/services/apiService';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';

interface TopicSelectorProps {
    selectedTopic: Topics | null;
    onSelectTopic: (topic: Topics) => void;
}

export default function TopicSelector({ selectedTopic, onSelectTopic }: TopicSelectorProps) {
    const { theme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { data: topics = [], isLoading } = useQuery({
        queryKey: ['topics', 'current-selector'], 
        queryFn: ApiService.getCurrentTopicSelectorData,
        staleTime: 1000 * 60 * 60 * 24, 
        gcTime: 1000 * 60 * 60 * 24 * 7,
    });

    const filteredTopics = topics.filter(topic => 
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (topic: Topics) => {
        onSelectTopic(topic);
        setModalVisible(false);
        setSearchQuery('');
    };

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.triggerBtn}>
                <Text style={[
                    styles.triggerText, 
                    { 
                        color: selectedTopic ? theme.colors.textPrimary : theme.colors.textSecondary, 
                        fontFamily: theme.fonts.openSans 
                    }
                ]}>
                    {selectedTopic ? selectedTopic.name : 'Topics'}
                </Text>
                <Ionicons 
                    name="chevron-down" 
                    size={14} 
                    color={theme.colors.textSecondary} 
                    style={{ marginLeft: 4 }} 
                />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
                    
                    {/* Modal Header */}
                    <View style={[styles.modalHeader, { borderBottomColor: theme.colors.textSecondary + '33' }]}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                            <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
                        </TouchableOpacity>
                        <Text style={[styles.modalTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                            Select a Topic
                        </Text>
                        <View style={styles.placeholder} />
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
                        <TextInput
                            style={[styles.searchInput, { 
                                backgroundColor: theme.colors.textSecondary + '11', 
                                color: theme.colors.textPrimary,
                                fontFamily: theme.fonts.openSans
                            }]}
                            placeholder="Search topics..."
                            placeholderTextColor={theme.colors.textSecondary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus={false}
                        />
                    </View>
                    
                    <View style={styles.listContainer}>
                    {isLoading ? (
                        <View style={styles.centerContainer}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    ) : (
                        <FlashList
                            data={filteredTopics}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={[styles.topicItem, { borderBottomColor: theme.colors.textSecondary + '11' }]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <View style={[styles.topicIconContainer, { backgroundColor: theme.colors.lightSecondary + '22' }]}>
                                        <Text style={{ color: theme.colors.secondary, fontWeight: 'bold' }}>#</Text>
                                    </View>
                                    <Text style={[styles.topicItemText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyboardShouldPersistTaps="handled"
                            ListEmptyComponent={
                                <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                                    No topics found.
                                </Text>
                            }
                        />
                    )
                }
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    triggerBtn: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    triggerText: { 
        fontSize: 14, 
        fontWeight: '600' 
    },
    
    modalContainer: { 
        flex: 1 
    },
    modalHeader: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        borderBottomWidth: 1 
    },
    closeBtn: { 
        padding: 4 
    },
    modalTitle: { 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    placeholder: { 
        width: 32 
    },
    
    searchContainer: { 
        padding: 16, 
        position: 'relative', 
        justifyContent: 'center' 
    },
    searchIcon: { 
        position: 'absolute', 
        left: 28, zIndex: 1 
    },
    searchInput: { 
        borderRadius: 8, 
        paddingVertical: 10, 
        paddingLeft: 40, 
        paddingRight: 16, 
        fontSize: 15 
    },
    
    topicItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 12, 
        paddingHorizontal: 16, 
        borderBottomWidth: 1 
    },
    topicIconContainer: { 
        width: 32, 
        height: 32, 
        borderRadius: 16, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: 12
    },
    topicItemText: { 
        fontSize: 15, 
        fontWeight: '500' 
    },
    
    emptyText: { 
        textAlign: 'center', 
        marginTop: 32, 
        fontSize: 14 
    },
    listContainer: {
        flex: 1,
    },
    centerContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});