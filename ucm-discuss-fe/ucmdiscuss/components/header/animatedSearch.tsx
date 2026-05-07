import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Animated, 
  Dimensions, 
  View,
  Keyboard,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const AnimatedSearchHeader = () => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const toggleSearch = () => {
    if (!active) {
      setActive(true);
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false, 
      }).start();
    } else {
      Keyboard.dismiss();
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setActive(false));
    }
  };

  return (
    <View style={styles.container}>
      {/* Trigger Icon */}
      <TouchableOpacity onPress={toggleSearch}>
        <Ionicons name="search-outline" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      {/* Full Overlay Search Bar */}
      {active && (
        <Animated.View 
          style={[
            styles.searchOverlay, 
            { 
              backgroundColor: theme.colors.background,
              width: overlayAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [40, SCREEN_WIDTH] 
              }),
              opacity: overlayAnim
            }
          ]}
        >
          <View style={styles.innerContainer}>
            <Ionicons name="search-outline" size={20} color={theme.colors.primary} />
            <TextInput
              placeholder="Search threads..."
              placeholderTextColor={theme.colors.textSecondary}
              style={[
                styles.input, 
                { color: theme.colors.textPrimary, fontFamily: theme.fonts.inter }
              ]}
              autoFocus
            />
            <TouchableOpacity onPress={toggleSearch} style={styles.closeButton}>
              <Text style={{ color: theme.colors.primary, fontFamily: theme.fonts.inter }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  searchOverlay: {
    position: 'absolute',
    top: -15, 
    right: -16, 
    height: 60,
    justifyContent: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    height: 40,
  },
  closeButton: {
    marginLeft: 10,
  }
});