import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '@/components/header/homeHeader';
import { SearchProvider, useSearch } from "@/context/SearchContext";
import { PendingUploadsProvider } from '@/context/PendingUploadsContext';

export default function HomeStackLayout() {
  const { theme } = useTheme();

  return (
    // <PendingUploadsProvider>
      <SearchProvider>
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
                header: () => (
                  <SafeAreaView
                    edges={['top']}
                    style={{ backgroundColor: theme.colors.primary }}>
                    <LayoutHeaderWrapper />
                  </SafeAreaView>
                )
            }} 
          />
          <Stack.Screen 
            name="[id]" 
            options={{ title: 'Thread Detail' }} 
          />
        </Stack>
      </SearchProvider>
    // </PendingUploadsProvider>
  );
}

const LayoutHeaderWrapper = () => {
    const { isSearchActive, openSearch, closeSearch, searchQuery, setSearchQuery } = useSearch();
    
    return (
        <HomeHeader 
            isSearchActive={isSearchActive}
            onOpenSearch={openSearch}
            onCloseSearch={closeSearch}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
        />
    )
}