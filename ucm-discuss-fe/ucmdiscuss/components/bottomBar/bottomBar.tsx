import { View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import AnonymousButton from "../buttons/anonymousButton";
import PostButton from "../buttons/postButton";
import { StyleSheet } from "react-native";

interface BottomBarProps {
    isAnonymous: boolean;
    onToggleAnonymous: (value: boolean) => void;
    disabled?: boolean;
    onPressPost: () => void;
}

export default function BottomBar({
    isAnonymous,
    onToggleAnonymous,
    disabled,
    onPressPost,
}: BottomBarProps) {
    const { theme } = useTheme();
    return (
        <View style={[styles.bottomBar, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.textSecondary + '33' }]}>
            <AnonymousButton isAnonymous={isAnonymous} onToggle={onToggleAnonymous} />
            <PostButton disabled={disabled} onPress={onPressPost} />
        </View>
    )
}

export const styles = StyleSheet.create({
    bottomBar: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 16, 
        paddingVertical: 8, 
        borderTopWidth: 1 
    },
})