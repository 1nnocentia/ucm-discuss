import { History } from '@/models/user';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export const HistoryCard = ({ item }: { item: History }) => {
    const { theme } = useTheme();

    const formattedDate = item.createdAt.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
    });

    return (
        <View style={[styles.container, { borderBottomColor: theme.colors.textSecondary }]}>
            <View style={styles.header}>
                <Text style={[styles.username, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                    {item.username}
                </Text>
                <Text style={[styles.time, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                    {formattedDate} 
                </Text>
            </View>
            
            <Text style={[styles.content, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                {item.description}
            </Text>

            <View style={styles.footer}>
                <View style={styles.iconGroup}>
                    <Ionicons name="thumbs-up-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Vote {item.voteCount}</Text>
                </View>
                <View style={styles.iconGroup}>
                    <Ionicons name="chatbubble-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>{item.commentCount}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, borderBottomWidth: 0.5 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    username: { fontSize: 14, marginRight: 12 },
    time: { fontSize: 12 },
    content: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
    footer: { flexDirection: 'row', gap: 16 },
    iconGroup: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    footerText: { fontSize: 12 }
});