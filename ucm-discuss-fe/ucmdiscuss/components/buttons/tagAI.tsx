import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, ActivityIndicator, Text, TextInput, Dimensions, Pressable } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { useGenerateAiTag } from "@/controllers/hooks/useGenerateAiTag";

interface TagAIProps {
    onAiSuccess: (question: string, answer: string) => void;
    threadId?: string;
    align?: 'left' | 'right';
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TagAI({ onAiSuccess, threadId, align = 'left' }: TagAIProps) {
    const { theme } = useTheme();
    const [isAiCalled, setAiCalled] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");

    const { mutateAsync, isPending } = useGenerateAiTag(threadId);

    const handleTagAIPress = () => {
        if (isPending) return; 
        
        setAiCalled(!isAiCalled);
        if (isAiCalled) setAiPrompt("");
    };

    const handleGenerate = async () => {
        if (!aiPrompt.trim()) return;

        try {
            const answer = await mutateAsync(aiPrompt);
            onAiSuccess(aiPrompt, answer);
            setAiPrompt("");
            setAiCalled(false);
            console.log("AI Answer:", answer);
        } catch (error) {
            console.error("Gagal generate:", error);
        }
    };

    const handleCloseBubble = () => {
        if (!isPending) {
            setAiCalled(false);
            setAiPrompt("");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.toolbarIcon} onPress={handleTagAIPress}>
                <Ionicons 
                name={isAiCalled ? "color-wand" : "color-wand-outline"} 
                size={24} 
                color={isAiCalled ? theme.colors.primary : theme.colors.textSecondary} 
                />
            </TouchableOpacity>

            {isAiCalled && (
            <>
                <Pressable 
                    style={styles.ghostBackdrop} 
                    onPress={handleCloseBubble} 
                />
                    
                <View style={[
                    styles.bubbleContainer, 
                    { 
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.primary + '40',
                    },
                    align === 'right' ? { right: 0 } : { left: 0 }
                ]}>
                    <Text style={[styles.bubbleLabel, { color: theme.colors.primary, fontFamily: theme.fonts.montserrat }]}>
                        Ask UCMDiscussAI
                    </Text>
                    
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[
                                styles.input, 
                                { 
                                    color: theme.colors.textPrimary,
                                    fontFamily: theme.fonts.openSans 
                                }
                            ]}
                            placeholder="Apa itu Business Model Canvas?"
                            placeholderTextColor={theme.colors.textSecondary + '80'}
                            value={aiPrompt}
                            onChangeText={setAiPrompt}
                            // maxLength={80}
                            editable={!isPending}
                            autoFocus
                            onSubmitEditing={handleGenerate}
                            returnKeyType="send"
                        />
                        
                        <TouchableOpacity 
                            style={[
                                styles.generateBtn, 
                                { backgroundColor: aiPrompt.trim() ? theme.colors.primary : theme.colors.textSecondary + '40' }
                            ]}
                            onPress={handleGenerate}
                            disabled={!aiPrompt.trim() || isPending}
                        >
                            {isPending ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Ionicons name="sparkles" size={16} color="#FFF" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    toolbarIcon: { 
        marginRight: 16 
    },
    container: {
        position: 'relative',
        zIndex: 50,
    },
    bubbleContainer: {
        position: 'absolute',
        bottom: '120%',
        width: 280,
        padding: 12,
        zIndex: 2,
        borderRadius: 12,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    bubbleLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    generateBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ghostBackdrop: {
        position: 'absolute',
        top: -SCREEN_HEIGHT * 2,
        bottom: -SCREEN_HEIGHT * 2,
        left: -SCREEN_WIDTH * 2,
        right: -SCREEN_WIDTH * 2,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
})