import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function HomeStackLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.textPrimary,
        // headerTitleStyle: { 
        //   fontFamily: theme.fonts.header, 
        //   fontSize: theme.fontSizes.headline 
        // },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: 'Threads' }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ title: 'Thread Detail' }} 
      />
    </Stack>
  );
}