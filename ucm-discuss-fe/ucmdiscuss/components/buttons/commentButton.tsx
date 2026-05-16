import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Post } from '@/models/user';

interface CommentButtonProps {
    post: Post;
    onPress?: () => void;
}

export default function CommentButton({ post, onPress }: CommentButtonProps) {
    const { theme } = useTheme();
    const commentCount = post.comments;

    return (
        <TouchableOpacity style={styles.commentGroup} onPress={onPress} activeOpacity={0.7}>
            <Ionicons name="chatbubble-outline" size={18} color={theme.colors.textSecondary} />
            <Text style={[styles.footerText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                {commentCount}
            </Text>
        </TouchableOpacity>
    )
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
        fontSize: 13, 
        fontWeight: '600' 
    }
})