import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

type TypingSpaceProps = {
    onSendComment?: (commentText: string) => void;
    replyingTo?: string; // Comment ID atau nama untuk context
};

export type TypingSpaceRef = {
    focusInput: () => void;
    clearInput: () => void;
    setReplyingTo: (commentId?: string) => void;
};

const TypingSpace = forwardRef<TypingSpaceRef, TypingSpaceProps>(({ onSendComment, replyingTo }, ref) => {
    const { theme } = useTheme();
    const [commentText, setCommentText] = useState('');
    const [localReplyingTo, setLocalReplyingTo] = useState<string | undefined>(replyingTo);
    const textInputRef = useRef<TextInput>(null);
    const isTyping = commentText.length > 0;

    useImperativeHandle(ref, () => ({
        focusInput: () => textInputRef.current?.focus(),
        clearInput: () => {
            setCommentText('');
            textInputRef.current?.clear();
        },
        setReplyingTo: (commentId?: string) => {
            setLocalReplyingTo(commentId);
        },
    }), []);

    const handleSendComment = () => {
        if (commentText.trim().length === 0) return;
        onSendComment?.(commentText.trim());
        if (!onSendComment) {
            console.log('Kirim komentar ke Controller:', commentText);
        }
        setCommentText('');
        setLocalReplyingTo(undefined);
    };

    const placeholder = localReplyingTo ? 'Write a reply...' : 'Write a comment...';

    return (
        <View style={[styles.inputContainer, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.textSecondary + '33' }]}>
            {isTyping && (
                <TouchableOpacity style={styles.leftBtn} onPress={() => setLocalReplyingTo(undefined)}>
                    <Ionicons name="close" size={28} color={theme.colors.textSecondary} />
                </TouchableOpacity>
            )}
            
            <TextInput
                ref={textInputRef}
                style={[styles.textInput, { 
                    backgroundColor: theme.colors.textSecondary + '11', 
                    color: theme.colors.textPrimary,
                    fontFamily: theme.fonts.openSans 
                }]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                maxLength={500}
                value={commentText}
                onChangeText={setCommentText}
            />

            {!isTyping ? (
                <View style={styles.rightActionGroup}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="image-outline" size={24} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Ionicons name="color-wand-outline" size={24} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity 
                    style={[
                        styles.sendBtn, 
                        { opacity: commentText.trim().length > 0 ? 1 : 0.5 }
                    ]}
                    onPress={handleSendComment}
                    disabled={commentText.trim().length === 0}
                >
                    <Ionicons name="send" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
            )}
        </View>
    )
});

TypingSpace.displayName = 'TypingSpace';

export default TypingSpace;

const styles = StyleSheet.create({
    inputContainer: { 
        flexDirection: 'row', 
        alignItems: 'flex-end',
        padding: 12, 
        borderTopWidth: 1 
    },
    
    leftBtn: { 
        marginRight: 8, 
        marginBottom: 6,
        padding: 4 
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
        marginLeft: 8,
        marginBottom: 6,
    },
    
    actionBtn: { 
        padding: 6,
        marginLeft: 4,
    },
    
    sendBtn: { 
        marginLeft: 12, 
        marginBottom: 8, 
        padding: 6 
    },
});