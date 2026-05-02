// import { ThemeProvider } from "@react-navigation/native";
import { ThemeProvider } from "@/context/ThemeContext";
import { Text, View } from "react-native";

import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, useFonts } from "@expo-google-fonts/montserrat";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { Merienda_400Regular, Merienda_500Medium, Merienda_600SemiBold } from "@expo-google-fonts/merienda";

export default function Index() {
  const [fontsLoaded, fontsError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-Bold': Montserrat_600SemiBold,
    'OpenSans-Regular': OpenSans_400Regular,
    'Merienda-Regular': Merienda_400Regular,
  });

  
  if (!fontsLoaded) {
    return null;
  }
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Edit app/index.tsx to edit this screen.</Text>
    // </View>
    <ThemeProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </ThemeProvider>
  );
}
