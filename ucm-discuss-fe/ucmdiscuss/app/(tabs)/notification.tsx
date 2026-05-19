import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationCard from "@/components/threadCard/notificationCard";
import { router } from "expo-router";
import { useState, useMemo } from "react";
import Header from "@/components/header/header";
import { useTheme } from "@/context/ThemeContext";
import { ApiService } from "@/controllers/services/apiService";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { NotificationProps } from "@/models/user";

export const notificationsScreen = () => {
    const { theme } = useTheme();
    const queryClient = useQueryClient();

    const { 
        data: notifications = [], 
        isLoading, 
        isError 
    } = useQuery<NotificationProps[]>({
        queryKey: ['notifications'],
        queryFn: async (): Promise<NotificationProps[]> => {
            return await ApiService.getNotifications();
        },
    });

    const markAsReadMutation = useMutation({
        mutationFn: async (id: string) => {
            return await ApiService.markNotificationAsRead(id);
        },
        onMutate: async (clickedId) => {
            await queryClient.cancelQueries({ queryKey: ['notifications'] });
            const previousNotifications = queryClient.getQueryData<NotificationProps[]>(['notifications']);
            queryClient.setQueryData<NotificationProps[]>(['notifications'], (old) => {
                if (!old) return [];
                return old.map((notif) => 
                    notif.id === clickedId ? { ...notif, isRead: true } : notif
                );
            });
            return { previousNotifications };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['notifications'], context?.previousNotifications);
            console.error("Gagal update notifikasi:", err);
        },
    });

    const sortedNotifications = useMemo(() => {
        return [...notifications].sort((a, b) => {
            if (a.isRead !== b.isRead) {
                return a.isRead ? 1 : -1;
            }
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            
            return dateB - dateA;
        });
    }, [notifications]);

    const handlePressNotification = (id: string) => {
        console.log("Notification pressed");
        markAsReadMutation.mutate(id);
        router.push('/(tabs)/(topics)/[id]');
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <Header title="Notifications" />
                <FlatList
                    data={sortedNotifications}
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