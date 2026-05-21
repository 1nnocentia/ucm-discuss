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
            router.push({
                pathname: '/createPostTopics',
                params: { 
                    topicId: currentTopic.id, 
                    topicName: currentTopic.name 
                }
            });
        } else {
            router.push('/createPostTopics');
        }
    }
    return (
        <View>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleOnPress} activeOpacity={0.7}>
                <Text style={[styles.buttonText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                    + Thread
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 999,
        padding: 8,
        maxWidth: 110,
        paddingRight: 10,
    },
    buttonText: {
        fontSize: 14,
    }
})