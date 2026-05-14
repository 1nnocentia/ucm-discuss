import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function TopicsStackLayout() {
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
            headerShown: false
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