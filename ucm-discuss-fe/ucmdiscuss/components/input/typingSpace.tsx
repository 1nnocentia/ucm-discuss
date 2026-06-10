import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import UploadImg from '../buttons/uploadImg';
import { useImageManipulator } from 'expo-image-manipulator';
import ZoomableImage from '@/components/common/zoomableImage';
import TagAI from '@/components/buttons/tagAI';

type TypingSpaceProps = {
    onSendComment?: (commentText: string, imageUri: string | null, askedAi?: boolean, aiQuestion?: string) => void;
    onCancelReply?: (cancelledCommentId: string) => void;
    replyingTo?: string;
    threadId?: string;
};

export type TypingSpaceRef = {
    focusInput: () => void;
    clearInput: () => void;
    setReplyingTo: (commentId?: string) => void;
};

const TypingSpace = forwardRef<TypingSpaceRef, TypingSpaceProps>(({ onSendComment, onCancelReply, replyingTo, threadId }, ref) => {
    const { theme } = useTheme();
    const [commentText, setCommentText] = useState('');
    const textInputRef = useRef<TextInput>(null);
    const [postImage, setPostImage] = useState<string | null>(null);
    const [aiResult, setAiResult] = useState<{ question: string; answer: string; isUsed?: boolean } | null>(null);
    const isTyping = commentText.length > 0 || postImage !== null || !!(aiResult && aiResult.isUsed);

    const handleAiSuccess = (question: string, answer: string) => {
        setAiResult({ question, answer });
    };

    const handleUseAiResult = () => {
        if (aiResult) {
            setAiResult({ ...aiResult, isUsed: true });
        }
    };

    const handleClearAiResult = () => {
        setAiResult(null);
    };


    const imageContext = useImageManipulator(postImage || '');

    useImperativeHandle(ref, () => ({
        focusInput: () => textInputRef.current?.focus(),
        clearInput: () => {
            setCommentText('');
            textInputRef.current?.clear();
            setPostImage(null);
        },
        setReplyingTo: (_commentId?: string) => { },
    }), []);

    const handleSendComment = () => {
        const hasContent = commentText.trim().length > 0 || postImage || (aiResult && aiResult.isUsed);
        if (!hasContent) return;

        const finalContent = aiResult && aiResult.isUsed ? aiResult.answer : commentText.trim();
        const askedAi = !!(aiResult && aiResult.isUsed);
        const aiQuestion = aiResult && aiResult.isUsed ? aiResult.question : undefined;

        onSendComment?.(finalContent, postImage, askedAi, aiQuestion);
        setCommentText('');
        setPostImage(null);
        setAiResult(null);
    };

    const placeholder = replyingTo ? 'Write a reply...' : 'Write a comment...';

    return (
        <View style={[{ backgroundColor: theme.colors.background }]}>

            {postImage && (
                <View style={[styles.mainWrapper, styles.imagePreviewWrapper, { borderTopColor: theme.colors.textSecondary + '33' }]}>
                    <View style={styles.imagePreviewContainer}>
                        <ZoomableImage uri={postImage} style={styles.imagePreview} resizeMode="cover" />
                        <TouchableOpacity
                            style={styles.removeImageBtn}
                            onPress={() => setPostImage(null)}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="close-circle" size={24} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {aiResult && (
                <View style={[styles.aiResultContainer, { borderColor: theme.colors.primary + '44', backgroundColor: theme.colors.primary + '11' }]}>
                    {aiResult.isUsed && (
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 8, right: 8, zIndex: 1, padding: 4 }}
                            onPress={handleClearAiResult}
                        >
                            <Ionicons name="close" size={18} color={theme.colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                    <View style={styles.aiResultContent}>
                        <Text style={[styles.aiLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.montserrat }]}>
                            Q: {aiResult.question}
                        </Text>
                        <Text style={[styles.aiAnswer, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}>
                            {aiResult.answer}
                        </Text>
                    </View>
                    {!aiResult.isUsed && (
                        <View style={styles.aiResultActions}>
                            <TouchableOpacity
                                style={[styles.aiActionBtn, { backgroundColor: theme.colors.primary }]}
                                onPress={handleUseAiResult}
                            >
                                <Ionicons name="checkmark" size={14} color="#FFF" style={{ marginRight: 4 }} />
                                <Text style={[styles.aiActionText, { color: '#FFF', fontFamily: theme.fonts.montserrat }]}>Use</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.aiActionBtn, { backgroundColor: theme.colors.textSecondary + '30' }]}
                                onPress={handleClearAiResult}
                            >
                                <Ionicons name="close" size={14} color={theme.colors.textSecondary} style={{ marginRight: 4 }} />
                                <Text style={[styles.aiActionText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.montserrat }]}>Dismiss</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            )}

            <View style={[styles.inputContainer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.textSecondary + '33' }]}>
                {isTyping && (
                    <TouchableOpacity style={styles.leftBtn} onPress={() => {
                        setCommentText('');
                        setPostImage(null);
                        setAiResult(null);
                        if (replyingTo) onCancelReply?.(replyingTo);
                    }}>
                        <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                )}

                <TextInput
                    ref={textInputRef}
                    style={[styles.textInput, {
                        backgroundColor: theme.colors.textSecondary + '11',
                        color: theme.colors.textPrimary,
                        fontFamily: theme.fonts.openSans
                    }]}
                    placeholder={aiResult?.isUsed ? 'Using AI response...' : placeholder}
                    placeholderTextColor={theme.colors.textSecondary}
                    multiline
                    maxLength={500}
                    editable={!aiResult?.isUsed}
                    value={aiResult?.isUsed ? '' : commentText}
                    onChangeText={setCommentText}
                />

                {!isTyping ? (
                    <View style={styles.rightActionGroup}>
                        <UploadImg
                            onImagesSelected={(images) => {
                                if (images.length > 0) {
                                    setPostImage(images[0].uri);
                                    console.log("Gambar berhasil dipilih:", images[0].uri);
                                }
                            }}
                        />
                        <View style={styles.actionBtn}>
                            {/* <Ionicons name="color-wand-outline" size={24} color={theme.colors.textSecondary} /> */}
                            <TagAI onAiSuccess={handleAiSuccess} threadId={threadId} align="right" />
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={[
                            styles.sendBtn,
                            { opacity: (commentText.trim().length > 0 || postImage || !!(aiResult && aiResult.isUsed)) ? 1 : 0.5 }
                        ]}
                        onPress={handleSendComment}
                        disabled={commentText.trim().length === 0 && !postImage && !(aiResult && aiResult.isUsed)}
                    >
                        <Ionicons name="send" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
});

TypingSpace.displayName = 'TypingSpace';

export default TypingSpace;

const styles = StyleSheet.create({
    mainWrapper: {
        borderTopWidth: 1,
        paddingTop: 8,
    },
    imagePreviewWrapper: {
        paddingHorizontal: 12,
        marginBottom: 8,
    },
    imagePreviewContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        position: 'relative',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    removeImageBtn: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        borderTopWidth: 1
    },

    leftBtn: {
        marginRight: 4,
        marginBottom: 6,
        padding: 2
    },

    textInput: {
        flex: 1,
        minHeight: 40,
        maxHeight: 120,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        paddingTop: 10,
        fontSize: 14
    },

    rightActionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 6,
        marginBottom: 4,
    },

    actionBtn: {
        padding: 4,
        // marginLeft: 6,
    },

    sendBtn: {
        marginLeft: 12,
        marginBottom: 8,
        padding: 6
    },
    aiResultContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        marginHorizontal: 12,
        marginTop: 8,
        marginBottom: 4,
    },
    aiResultContent: {
        marginBottom: 8,
    },
    aiLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    aiAnswer: {
        fontSize: 13,
        lineHeight: 18,
    },
    aiResultActions: {
        flexDirection: 'row',
        gap: 8,
    },
    aiActionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        borderRadius: 6,
    },
    aiActionText: {
        fontSize: 12,
        fontWeight: '600',
    },
});