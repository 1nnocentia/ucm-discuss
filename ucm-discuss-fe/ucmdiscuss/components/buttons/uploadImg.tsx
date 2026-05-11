import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

interface UploadImgProps {
    onImagesSelected: (images: { uri: string; id: number }[]) => void;
}

export default function UploadImg({ onImagesSelected }: UploadImgProps) {
    const { theme } = useTheme();
    const [selectedImages, setSelectedImages] = useState<{ uri: string; id: number }[]>([]);
    const MAX_IMAGES = 1;

    const handleUploadPress = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Denied', 
                'UCM Discuss requires access to your gallery to upload screenshots or images.'
            );
            return;
        }

        if (selectedImages.length > MAX_IMAGES) {
            Alert.alert('Limit Reached', `You can only select up to ${MAX_IMAGES} image(s).`);
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: MAX_IMAGES - selectedImages.length,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = result.assets.map((asset) => ({
                uri: asset.uri,
                id: Date.now() + Math.random(),
            }));
            
            const updatedImages = [...selectedImages, ...newImages].slice(0, MAX_IMAGES);
            setSelectedImages(updatedImages);
            
            onImagesSelected(updatedImages);
        }
    };
    return (
        <TouchableOpacity style={styles.toolbarIcon} onPress={handleUploadPress}>
            <Ionicons name="image-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
    )
}

const styles = {
    toolbarIcon: { 
        marginRight: 16 
    },
}