import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

interface CommentButtonProps {
    count: number;
    targetId: string;
    onPress?: () => void;
}

export default function CommentButton({ count, targetId, onPress }: CommentButtonProps) {
    const { theme } = useTheme();

    const handleCommentAction = () => {
        if (onPress) {
            onPress();
        } else {
            router.push({
                pathname: '/threads/[id]',
                params: { id: targetId, focusInput: 'true' }
            });
        }
    };

    return (
        <TouchableOpacity style={styles.commentGroup} onPress={handleCommentAction} activeOpacity={0.7}>
            <Ionicons name="chatbubble-outline" size={18} color={theme.colors.textSecondary} />
            <Text style={[styles.footerText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}> 
                {count}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    commentGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6,
        paddingVertical: 4,
        paddingRight: 12,
    },
    footerText: { 
        fontSize: 12, 
    }
})