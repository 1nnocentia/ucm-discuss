import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { AnimatedSearchHeader } from './animatedSearch';

export const HomeHeader = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

      {/* Logo */}
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          UCM Discuss
        </Text>

      {/* Search */}
      <View style={styles.rightContainer}>
        <AnimatedSearchHeader />
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
    fontSize: 20,
    fontFamily: 'Merienda-Bold',
  },
  rightContainer: {
    width: 'auto',
    minWidth: 40,
    alignItems: 'flex-end',
  },
});