import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import LogoutButton from '../buttons/logoutButton';

interface HomeHeaderProps {
  isSearchActive?: boolean;
  onOpenSearch?: () => void;
  onCloseSearch?: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const HomeHeader = ({ isSearchActive, onOpenSearch, onCloseSearch, searchQuery, onSearchQueryChange }: HomeHeaderProps) => {
  const { theme } = useTheme();

  if (isSearchActive) {
    return (
      <View style={[styles.containerActive, { backgroundColor: theme.colors.background }]}>
          {/* Input Bar */}
          <View style={[styles.inputWrapper, { backgroundColor: theme.colors.textSecondary + '11' }]}>
              <Ionicons name="search" size={20} color={theme.colors.icon} style={styles.searchIcon} />
              <TextInput
                  style={[styles.input, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}
                  placeholder="Search UCM Discuss"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={searchQuery}
                  onChangeText={onSearchQueryChange}
                  autoFocus={true} 
                  returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => onSearchQueryChange('')} style={styles.clearBtn}>
                      <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
              )}
          </View>
          {/* Tombol Cancel */}
          <TouchableOpacity onPress={onCloseSearch} style={styles.cancelBtn}>
              <Text style={[styles.cancelText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                  Cancel
              </Text>
          </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>

      {/* Logo */}
        {/* <Text style={[styles.title, { color: theme.colors.logo }]}>
          UCM Discuss
        </Text> */}
        <LogoutButton>
            <Text style={[styles.title, { color: theme.colors.logo }]}>
                UCM Discuss
            </Text>
        </LogoutButton>

      {/* Search */}
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onOpenSearch} style={styles.triggerBtn}>
          <Ionicons name="search-outline" size={24} color={theme.colors.logo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
  },
  triggerBtn: { 
    padding: 4 
  },
  rightContainer: {
    width: 'auto',
    minWidth: 40,
    alignItems: 'flex-end',
  },
  containerActive: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 60, 
    paddingHorizontal: 16 
  },
  inputWrapper: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    height: 40 
  },
  searchIcon: { 
    marginRight: 8 
  },
  input: { 
    flex: 1, 
    fontSize: 16, 
    height: '100%' 
  },
  clearBtn: { 
    padding: 4 
  },
  cancelBtn: { 
    marginLeft: 16 
  },
  cancelText: { 
    fontSize: 16 
  },
});