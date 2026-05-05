import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const AnimatedSearchHeader = () => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  
  const animation = useSharedValue(0);

  const toggleSearch = () => {
    const newValue = active ? 0 : 1;
    animation.value = withTiming(newValue, { duration: 300 });
    setActive(!active);
  };

  // Style untuk box pencarian
  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(animation.value, [0, 1], [40, SCREEN_WIDTH - 80]),
      backgroundColor: active ? theme.colors.lightSecondary : 'transparent',
      borderRadius: 20,
      paddingHorizontal: interpolate(animation.value, [0, 1], [0, 12]),
    };
  });

  // Style untuk menyembunyikan/memunculkan input text
  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      flex: 1,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchBox, animatedBoxStyle]}>
        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons 
            name={active ? "close-outline" : "search-outline"} 
            size={24} 
            color={theme.colors.textSecondary} 
          />
        </TouchableOpacity>
        
        {active && (
          <Animated.View style={animatedInputStyle}>
            <TextInput
              placeholder="Search threads..."
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.input, { color: theme.colors.textPrimary, fontFamily: theme.fonts.inter }]}
              autoFocus
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchBox: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    marginLeft: 8,
    fontSize: 14,
    height: '100%',
  },
});