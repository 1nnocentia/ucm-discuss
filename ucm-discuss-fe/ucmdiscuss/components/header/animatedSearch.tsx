import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View,Text,Modal,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export const AnimatedSearchHeader = () => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = ['Artificial Intelligence', 'React Native bugs', 'Campus Event 2026'];

  const closeSearch = () => {
    setActive(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(true)} style={styles.iconButton}>
        <Ionicons name="search-outline" size={24} color={theme.colors.icon} />
      </TouchableOpacity>

      <Modal
        visible={active}
        animationType="slide" 
        onRequestClose={closeSearch}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          
          <View style={[styles.searchHeader, { borderBottomColor: theme.colors.textSecondary + '33' }]}>
            <View style={[styles.inputWrapper, { backgroundColor: theme.colors.textSecondary + '11' }]}>
              <Ionicons name="search" size={20} color={theme.colors.icon} style={styles.searchIcon} />
              <TextInput
                style={[styles.input, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}
                placeholder="Search UCM Discuss"
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={true}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                  <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onPress={closeSearch} style={styles.cancelBtn}>
              <Text style={[styles.cancelText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          {/* Body: Recent Searches / Suggestions */}
          {searchQuery.length === 0 ? (
            <View style={styles.historyContainer}>
              <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                Recent Searches
              </Text>
              <FlatList
                data={recentSearches}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.historyItem}>
                    <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
                    <Text style={[styles.historyText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          ) : (
            <View style={styles.resultsContainer}>
              <Text style={[styles.searchingText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                Searching for "{searchQuery}"...
              </Text>
            </View>
          )}

        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  iconButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  cancelBtn: {
    marginLeft: 16,
  },
  cancelText: {
    fontSize: 16,
  },
  historyContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  historyText: {
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  searchingText: {
    fontSize: 14,
    fontStyle: 'italic',
  }
});