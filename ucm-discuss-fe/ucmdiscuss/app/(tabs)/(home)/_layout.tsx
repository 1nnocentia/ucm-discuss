import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';

export default function HomeStackLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { 
            backgroundColor: theme.colors.background 
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
            headerTitle: () => (
                <Text style={{ 
                  fontFamily: 'Marienda-Bold',
                  fontSize: theme.fontSizes.title,
                  color: theme.colors.textPrimary
                 }}>
                    UCM Discuss
                 </Text>
            ),
            headerTitleAlign: 'center',
            headerRight: () => {
              <TouchableOpacity style={{ marginRight: 16 }}>
                <Ionicons name="search-outline" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            }
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: 'Thread Detail' }} 
      />
    </Stack>
  );
}

// const { theme } = useTheme();

// const styles = StyleSheet.create({
//     logo: {
//         fontFamily: 'Merienda-Bold',
//         fontSize: theme.fontSizes.title,
//     }
// })