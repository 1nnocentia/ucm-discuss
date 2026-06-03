import { StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginButton from "@/components/buttons/loginButton";
import { useRouter } from "expo-router";  
import { ApiService } from "@/controllers/services/apiService";

export default function LoginScreen() {
    const { theme } = useTheme();
    const { demoLogin } = useAuth();
    const router = useRouter();
    const ImgBg = require("@/assets/splashscreen/splashMinimal.png");

    const handleFakeLogin = async () => {
        try {
            const success = await demoLogin();
            if (success) {
                router.replace('/(tabs)/(home)');
            }
        } catch (error) {
            console.error("Gagal fake login:", error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
                <Image source={ImgBg} style={styles.backgroundImage} />
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.contentWrapper}>
                            <LoginButton />
                                <TouchableOpacity 
                                        style={styles.fakeLoginButton} 
                                        onPress={handleFakeLogin}
                                        activeOpacity={0.8}
                                    >
                                    <Text style={styles.fakeLoginText}>Demo Login</Text>
                                </TouchableOpacity>
                        </View>
                    </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 200,
        zIndex: 10,
        gap: 20,
    },
    fakeLoginButton: {
        backgroundColor: '#9C27B0', 
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        width: '100%',
        maxWidth: 200,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    fakeLoginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    }
})