import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/context/ThemeContext';

interface PostHistoryCardProps {
    title: string;
}

export default function PostHistoryCard({ item }: { item: PostHistoryCardProps }) {
    const { theme } = useTheme();
    return (
        <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
            {item.title}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: { 
        fontSize: 16, 
        lineHeight: 22, 
        marginBottom: 12 
    },
})