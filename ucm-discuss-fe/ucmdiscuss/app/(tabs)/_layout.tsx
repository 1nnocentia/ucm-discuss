import { Tabs } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

import { AnimatedTabButton } from "@/components/buttons/tabButton";
import { CenterTabButton } from "@/components/buttons/centerTabButton";

export default function TabsLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{ 
                tabBarActiveTintColor: theme.colors.buttonOn,
                tabBarInactiveTintColor: theme.colors.buttonOff,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                    paddingTop: 7,
                    paddingBottom: 10,
                },
                tabBarButton: (props) => <AnimatedTabButton {...props} />,
             }}>
            <Tabs.Screen
                name="(home)"
                options={{
                    // tabBarShowLabel: false,
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(topics)"
                options={{
                    // tabBarShowLabel: false,
                    title: "Topics",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size ?? 24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="createNewThread"
                options={{
                    // tabBarShowLabel: false,
                    title: "New Thread",
                    tabBarIcon: ({ focused, color }) => (
                        <CenterTabButton focused={focused}>
                            <Ionicons 
                            name="add" 
                            size={32} 
                            color={focused ? "#FFFFFF" : color} 
                            />
                        </CenterTabButton>
                    ),
                    // tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    // tabBarShowLabel: false,
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