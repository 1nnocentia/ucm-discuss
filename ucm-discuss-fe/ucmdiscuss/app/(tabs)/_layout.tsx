import { Tabs } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { HapticTab } from "@/app-example/components/haptic-tab";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{ 
                tabBarActiveTintColor: theme.colors.buttonOn,
                tabBarInactiveTintColor: theme.colors.buttonOff,
                headerShown: false,
                tabBarButton: HapticTab,
             }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="recent"
                options={{
                    title: "Recent",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="createNewThread"
                options={{
                    title: "Create New Thread",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: "Notifications",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size ?? 24} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}