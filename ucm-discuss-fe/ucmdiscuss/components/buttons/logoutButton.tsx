import { useRouter } from "expo-router";
import React, { ReactNode, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Ionicons from "@expo/vector-icons/build/Ionicons";

interface LogoutTriggerProps {
    children: ReactNode;
}

export default function LogoutButton({ children }: LogoutTriggerProps){
    const { theme } = useTheme();
    const router = useRouter();
    const { logout, loading } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = async () => {
        const success = await logout();
        setShowMenu(false);
        if (success) {
            router.replace("/login");
        }
    };

    console.log("LogoutButton rendered, showMenu:", showMenu);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity 
                onLongPress={() => setShowMenu(true)}
                onPress={() => setShowMenu(false)} 
                activeOpacity={0.8}
            >
                {children}
            </TouchableOpacity>

            {/* Gelembung Logout */}
            {showMenu && (
                <View style={styles.logoutBubble}>
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={18} color="#DB4437" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    logoutBubble: {
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 4,
        minWidth: 120,
        elevation: 4, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        zIndex: 100, 
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        gap: 8,
    },
    logoutText: {
        color: '#DB4437',
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    }
})