import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/context/ThemeContext';

import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, useFonts } from "@expo-google-fonts/montserrat";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { Merienda_400Regular, Merienda_500Medium, Merienda_600SemiBold } from "@expo-google-fonts/merienda";
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '@/context/AuthContext';
import { PendingUploadsProvider } from '@/context/PendingUploadsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function RootLayout() {
  const [lottieFinished, setLottieFinished] = React.useState(false);
  const [queryClient] = useState<QueryClient>(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60,
        },
      },
    });
  });

  const [fontsLoaded, fontsError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-Bold': Montserrat_600SemiBold,
    'OpenSans-Regular': OpenSans_400Regular,
    'Merienda-Regular': Merienda_400Regular,
    'Merienda-Bold': Merienda_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded || fontsError) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  if (!lottieFinished) {
    return (
      <View style={{ flex: 1, backgroundColor: '#121212' }}> 
        <LottieView
          source={require('@/assets/splashscreen/splashscreen.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => setLottieFinished(true)}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <PendingUploadsProvider>
              <MainLayout />
            </PendingUploadsProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

function MainLayout() {
  const { theme } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
    </Stack>
  );
}