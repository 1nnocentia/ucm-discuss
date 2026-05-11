import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface AnonymousButtonProps {
    isAnonymous: boolean;
    onToggle: (value: boolean) => void;
}

export default function AnonymousButton({ isAnonymous, onToggle }: AnonymousButtonProps) {
    const { theme } = useTheme();
    return (
         <View style={styles.anonymousRow}>
            <Text style={[styles.anonymousText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                Post Anonymously
            </Text>
            <Switch
                value={isAnonymous}
                onValueChange={onToggle}
                trackColor={{ false: theme.colors.textSecondary + '55', true: theme.colors.secondary }}
                thumbColor={"#FDFDFD"}
                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    anonymousRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8 
    },
    anonymousText: { 
        fontSize: 12 
    },
})