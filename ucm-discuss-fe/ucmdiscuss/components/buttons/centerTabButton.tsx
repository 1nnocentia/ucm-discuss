import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface CenterTabButtonProps {
  children: React.ReactNode;
  focused: boolean;
}

export const CenterTabButton = ({ children, focused }: CenterTabButtonProps) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: focused ? `${theme.colors.buttonOn}95` : `${theme.colors.buttonOff}40`,
        borderColor: theme.colors.primary,
      }
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 34,
    borderRadius: 14, 
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, 
  },
});