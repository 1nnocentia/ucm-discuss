import { StyleSheet, Image } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginButton from "@/components/buttons/loginButton";
import ImgBg from "@/assets/splashscreen/splashMinimal.png";

export default function LoginScreen() {
    const { theme } = useTheme();
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <Image source={ImgBg} style={styles.backgroundImage} />
            <LoginButton />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
    },

})