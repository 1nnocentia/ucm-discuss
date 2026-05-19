import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";


export default function LoginButton() {
    const { theme } = useTheme();
    const router = useRouter();
    const { login, loading } = useAuth();

    const handleLoginPress = async () => {
        const success = await login();
        if (success) {
            router.replace("/(tabs)/(home)");
        }
    };

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary, opacity: loading ? 0.7 : 1 }]}
                onPress={handleLoginPress}
                activeOpacity={0.7}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Login with UC Account'}</Text>
            </TouchableOpacity>
        </View>
    )   
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    }

})