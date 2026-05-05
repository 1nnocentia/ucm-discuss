import { Pressable, ViewStyle, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, Easing } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

export const AnimatedTabButton = ({ children, onPress, style,  }: BottomTabBarButtonProps) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    
    const handlePressIn = () => {
        scale.value = withTiming(0.95, {duration: 100, easing: Easing.out(Easing.ease)});
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const handlePressOut = () => {
        scale.value = withTiming(1, {duration: 150, easing: Easing.in(Easing.ease)});
    }

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.container, style]}
        >
            <Animated.View style={[styles.inner, animatedStyle]}>
                {children}
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inner: {
        alignItems: "center",
        justifyContent: "center",
    },
});