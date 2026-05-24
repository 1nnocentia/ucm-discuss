import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import Header from '@/components/header/header';
import BottomBar from '@/components/bottomBar/bottomBar';
import UploadImg from '@/components/buttons/uploadImg';
import TagAI from '@/components/buttons/tagAI';
import { SaveFormat, useImageManipulator } from 'expo-image-manipulator';
import TopicSelector from '@/components/topic/topicSelector';
import { RETRY_COOLDOWN_MS, usePendingUploads } from '@/context/PendingUploadsContext';
import { AuthorSnippet } from '@/models/user';
import { ApiService } from '@/controllers/services/apiService';
import { useAuth } from '@/context/AuthContext';

export default function CreateThreadScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const { user } = useAuth();
    const { addLocalPost, markPostPublished, markPostRetryable } = usePendingUploads();

    const [selectedTopic, setSelectedTopic] = useState<{ id: string, name: string } | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [postImage, setPostImage] = useState<string | null>(null);

    const imageContext = useImageManipulator(postImage || '');
    const contentInputRef = useRef<TextInput | null>(null);

    const handlePost = async () => {
        let finalImageUri = postImage;

        if (postImage && imageContext) {
            try {
                imageContext.resize({ width: 1080 });
                const imageRef = await imageContext.renderAsync();
                const result = await imageRef.saveAsync({
                    compress: 0.6,
                    format: SaveFormat.JPEG,
                });
                finalImageUri = result.uri;
            } catch (error) {
                console.error("Gagal mengkompresi gambar, menggunakan gambar asli:", error);
            }
        }

        const localPostId = `local-${Date.now()}`;
        const optimisticTopic = selectedTopic ?? { id: 'local-topic', name: 'General' };
        const optimisticUser: AuthorSnippet = {
            id: user?.id || 'local-user',
            name: user?.name || 'Anonymous',
            isAnonymous: isAnonymous,
        };

        await addLocalPost({
            id: localPostId,
            title,
            description: content,
            image: finalImageUri,
            createdAt: 'now',
            votes: 0,
            comments: 0,
            topic: optimisticTopic,
            user: optimisticUser,
            userVoteStatus: false,
            retryAvailableAt: Date.now() + RETRY_COOLDOWN_MS,
            createdAtTimestamp: Date.now(),
        });

        // router.replace('/(tabs)/(home)');
        if (router.canGoBack()) {
            router.back();
        }

        (async () => {
            try {
                const payload = {
                    title: title,
                    description: content.trim() === ' ' ? null : content,
                    image: finalImageUri,
                    topicId: selectedTopic!.id,
                    isAnonymous: isAnonymous,
                };
                await ApiService.createPost(payload);
                await markPostPublished(localPostId);
                console.log("Thread background upload sukses!");
            } catch (error) {
                await markPostRetryable(localPostId, error instanceof Error ? error.message : 'Upload gagal');
                console.log("Thread background upload gagal, masuk mode retry.");
            }
        })();
    };

    const isButtonDisabled = title.trim().length === 0 || selectedTopic === null;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Header title="New Thread" />

                <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                    
                        <View style={styles.topicSelector}>
                            <Text style={[styles.topicText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                                {isAnonymous ? 'anonymous' : user?.name}
                            </Text>
                            <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} style={styles.topicIcon} />
                            <TopicSelector 
                                selectedTopic={selectedTopic}
                                onSelectTopic={setSelectedTopic}
                            />
                        </View>

                        <TextInput
                            style={[styles.titleInput, { color: theme.colors.textPrimary, borderColor: theme.colors.textSecondary + '33', fontFamily: theme.fonts.montserrat }]}
                            placeholder="Title"
                            placeholderTextColor={theme.colors.textSecondary}
                            value={title}
                            onChangeText={setTitle}
                        />
                        
                        {postImage && (
                            <View style={styles.imagePreviewContainer}>
                                <Image 
                                    source={{ uri: postImage }} 
                                    style={styles.imagePreview} 
                                    resizeMode="cover"
                                />
                                <TouchableOpacity 
                                    style={[styles.removeImageBtn, { backgroundColor: 'rgba(0,0,0,0.6)' }]} 
                                    onPress={() => setPostImage(null)}
                                >
                                    <Ionicons name="close" size={20} color="#FDFDFD" />
                                </TouchableOpacity>
                            </View>
                        )}

                        <TextInput
                            ref={contentInputRef}
                            style={[styles.contentInput, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}
                            placeholder={`Before you post, please make sure to:\n1. Add a clear title that describe your question.\n2. Add all required option below (Course name and Topic)\n3. Write a detailed description of your issue\n\nNote: Screenshots are welcome, but please do not posts full assignment.`}
                            placeholderTextColor={theme.colors.textSecondary}
                            multiline
                            textAlignVertical="top"
                            value={content}
                            onChangeText={setContent}
                        />
                        
                        <View style={styles.toolbar}>
                            <UploadImg 
                                onImagesSelected={(images) => {
                                    if (images.length > 0) {
                                        setPostImage(images[0].uri);
                                        console.log("Gambar berhasil dipilih:", images[0].uri);
                                    }
                                }} 
                            />  
                            <TagAI />
                        </View>
                </ScrollView>

                <BottomBar
                    isAnonymous={isAnonymous}
                    onToggleAnonymous={setIsAnonymous}
                    disabled={isButtonDisabled}
                    onPressPost={handlePost}
                />
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1 
    },
    container: { 
        flex: 1 
    },
    scrollView: { 
        flex: 1, 
        paddingHorizontal: 20
    },
    scrollContent: {
        flexGrow: 1,
    },
    topicSelector: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 16, 
        marginBottom: 12 
    },
    topicText: { 
        fontSize: 14, 
        fontWeight: '600' 
    },
    topicIcon: { 
        marginHorizontal: 8 
    },
    titleInput: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        borderBottomWidth: 1, 
        paddingVertical: 12, 
        marginBottom: 16 
    },
    contentInput: { 
        fontSize: 14, 
        // minHeight: 200, 
        lineHeight: 22 
    },
    toolbar: { 
        flexDirection: 'row', 
        marginTop: 16, 
        marginBottom: 32,
        gap: 18,
    },
    toolbarIcon: { 
        marginRight: 16 
    },
    imagePreviewContainer: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    removeImageBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 6,
        borderRadius: 20,
    },
});