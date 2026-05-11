import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export default function UploadImg() {
    const { theme } = useTheme();
    return (
        <TouchableOpacity style={styles.toolbarIcon}>
            <Ionicons name="image-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
    )
}

const styles = {
    toolbarIcon: { 
        marginRight: 16 
    },
}