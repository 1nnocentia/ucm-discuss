import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface PostButtonProps {
    disabled?: boolean;
    onPress: () => void;
}

export default function PostButton({ disabled, onPress }: PostButtonProps) {
    const { theme } = useTheme();

    const buttonColor = disabled ? theme.colors.textSecondary + '40' : theme.colors.buttonOn ;
    const textColor = disabled ? theme.colors.textSecondary : theme.colors.background;
    
    return (
        <TouchableOpacity 
            style={[styles.postButton, { backgroundColor: buttonColor }]}
            disabled={disabled}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.postButtonText, { fontFamily: theme.fonts.montserrat, color: textColor }]}>Post</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    postButton: { 
        paddingHorizontal: 24, 
        paddingVertical: 10, 
        borderRadius: 24 
    },
    postButtonText: { 
        fontSize: 14, 
        fontWeight: 'bold' 
    }
})