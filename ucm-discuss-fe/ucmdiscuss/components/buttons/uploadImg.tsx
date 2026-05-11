import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

interface UploadImgProps {
    onPress: () => void;
}

export default function UploadImg({ onPress }: UploadImgProps) {
    const { theme } = useTheme();
    const [selectedImages, setSelectedImages] = useState([]);
    const MAX_IMAGES = 1;

    return (
        <TouchableOpacity style={styles.toolbarIcon} onPress={onPress}>
            <Ionicons name="image-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
    )
}

const styles = {
    toolbarIcon: { 
        marginRight: 16 
    },
}