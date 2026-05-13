import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/context/ThemeContext';

interface CommentHistoryCardProps {
    parentPostTitle: string;
    content: string;
}

export default function PostHistoryCard({ item }: { item: CommentHistoryCardProps }) {
    const { theme } = useTheme();
    return (
        <View>
            <Text style={[styles.contextText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                Commented on: <Text style={{ fontStyle: 'italic' }}>{item.parentPostTitle}</Text>
            </Text>
            <Text style={[styles.content, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                {item.content}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: { 
        fontSize: 16, 
        lineHeight: 22, 
        marginBottom: 12 
    },
    contextText: { 
        fontSize: 12, 
        marginBottom: 4 
    },
    content: { 
        fontSize: 14, 
        lineHeight: 20, 
        marginBottom: 12 
    },
})