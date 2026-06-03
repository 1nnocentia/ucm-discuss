import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Ionicons from "@expo/vector-icons/build/Ionicons";


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
                style={[styles.button, { backgroundColor: theme.colors.logo, opacity: loading ? 0.7 : 1 }]}
                onPress={handleLoginPress}
                activeOpacity={0.7}
                disabled={loading}
            >
                <Ionicons 
                    name="logo-google" 
                    size={20} 
                    color="#ea4335"
                    style={styles.googleIcon} 
                />

                <Text style={[styles.buttonText]}>{loading ? 'Signing in...' : 'Login with UC Account'}</Text>
            </TouchableOpacity>
        </View>
    )   
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    button: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F4F5', 
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '100%',
        maxWidth: 280, 
        borderWidth: 1,
        borderColor: '#E3E5E8',
    },
    googleIcon: {
        marginRight: 25, 
    },
    buttonText: {
        fontSize: 15,
        fontFamily: 'Inter-Medium', 
        color: '#121212',
    }

})