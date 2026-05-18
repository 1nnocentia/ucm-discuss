import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import UploadImg from '../buttons/uploadImg';
import { useImageManipulator } from 'expo-image-manipulator';

type TypingSpaceProps = {
    onSendComment?: (commentText: string, imageUri:string|null) => void;
    replyingTo?: string; 
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
    const [postImage, setPostImage] = useState<string | null>(null);
    const isTyping = commentText.length > 0 ||  postImage !== null;


    const imageContext = useImageManipulator(postImage || '');

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
        if (commentText.trim().length === 0 && !postImage) return;
        onSendComment?.(commentText.trim(), postImage);
        if (!onSendComment) {
            console.log('Kirim komentar ke Controller:', commentText);
        }
        setCommentText('');
        setLocalReplyingTo(undefined);
    };

    const placeholder = localReplyingTo ? 'Write a reply...' : 'Write a comment...';

    return (
        <View style={[styles.mainWrapper, { backgroundColor: theme.colors.background, borderTopColor: theme.colors.textSecondary + '33' }]}>

            {postImage && (
                <View style={styles.imagePreviewWrapper}>
                    <View style={styles.imagePreviewContainer}>
                        <Image source={{ uri: postImage }} style={styles.imagePreview} />
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
                        <UploadImg 
                            onImagesSelected={(images) => {
                                        if (images.length > 0) {
                                            setPostImage(images[0].uri);
                                            console.log("Gambar berhasil dipilih:", images[0].uri);
                                        }
                                    }} 
                        />
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
        width: 80,
        height: 80,
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