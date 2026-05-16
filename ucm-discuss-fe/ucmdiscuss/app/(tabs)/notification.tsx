import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationCard from "@/components/threadCard/notificationCard";
import { router } from "expo-router";
import { dummyNotifications } from "@/constants/dummyData/dummyData";
import { useState, useMemo } from "react";
import Header from "@/components/header/header";
import { useTheme } from "@/context/ThemeContext";

export const notificationsScreen = () => {
    const { theme } = useTheme();

    const [notifications, setNotifications] = useState(dummyNotifications);

    const unreadNotifications = useMemo(() => {
        return notifications.filter((notif) => notif.isRead === false);
    }, [notifications]);

    const handlePressNotification = (id: string) => {
        console.log("Notification pressed");
        setNotifications((prevNotifications) => 
            prevNotifications.map((notif) => 
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
        // router.push('thread/${postId}')
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <Header title="Notifications" />
                <FlatList
                    data={unreadNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NotificationCard 
                            item={item} 
                            onPress={() => handlePressNotification(item.id)} 
                        />
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No new notifications</Text>
                        </View>
                    )}
                />

        </SafeAreaView>
    )
}

export default notificationsScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, 
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 14,
    }
});