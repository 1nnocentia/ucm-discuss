import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { TopicsData } from '@/models/user';

interface NewPostButtonProps {
    currentTopic?: TopicsData;
}

export default function NewPostButton({ currentTopic }: NewPostButtonProps) {
    const { theme } = useTheme();
    const handleOnPress = () => {
        if (currentTopic) {
            router.push(`/create-thread?topicId=${currentTopic.id}&topicName=${encodeURIComponent(currentTopic.name)}`);
        } else {
            router.push('/create-thread');
        }
    }
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={handleOnPress} activeOpacity={0.7}>
                <Text style={[styles.buttonText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.montserrat }]}>
                    + New Thread
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    buttonText: {
        fontSize: 14,
    }
})