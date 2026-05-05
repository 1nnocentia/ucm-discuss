import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { AnimatedSearchHeader } from './animatedSearch';

export const HomeHeader = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>

      {/* Logo */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.merienda }]}>
          UCM Discuss
        </Text>
      </View>

      {/* Tombol Search */}
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
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 40,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Marienda-Bold'
  },
  rightContainer: {
    width: 'auto',
    minWidth: 40,
    alignItems: 'flex-end',
  },
});