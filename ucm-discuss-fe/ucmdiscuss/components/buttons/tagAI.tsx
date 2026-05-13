import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function TagAI() {
    const { theme } = useTheme();
    const [isAiCalled, setAiCalled] = useState(false);

    const handleTagAIPress = () => {
        setAiCalled(true);
    }

    return (
        <TouchableOpacity style={styles.toolbarIcon} onPress={handleTagAIPress}>
            <Ionicons 
            name={isAiCalled ? "color-wand" : "color-wand-outline"} 
            size={24} 
            color={isAiCalled ? theme.colors.primary : theme.colors.textSecondary} 
            />
        </TouchableOpacity>
    )
}

const styles = {
    toolbarIcon: { 
        marginRight: 16 
    },
}