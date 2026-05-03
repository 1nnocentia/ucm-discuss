import React, { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";
import { LIGHT_THEME, DARK_THEME, Theme } from "@/constants/theme";

interface ThemeContextData {
    theme: Theme;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  
  const isDark = colorScheme === 'dark';
  const theme = (isDark ? DARK_THEME : LIGHT_THEME) as Theme;

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};