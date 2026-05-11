import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

interface HeaderProps {
    title: string;
}

export default function Header ({ title }: HeaderProps) {
    const { theme } = useTheme();
    return(
        <View style={[styles.header, { borderBottomColor: theme.colors.textSecondary + '33' }]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
                <Text style={[styles.cancelText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                    Cancel
                </Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                {title}
            </Text>
            <View style={styles.headerRight} />
        </View>
    )
}

export const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
    headerLeft: { flex: 1 },
    cancelText: { fontSize: 16 },
    headerTitle: { fontSize: 16, fontWeight: 'bold', flex: 2, textAlign: 'center' },
    headerRight: { flex: 1 },
})