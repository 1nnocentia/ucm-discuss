// src/app/(tabs)/(home)/create.tsx (Atau letak rute modamu)
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import Header from '@/components/header/header';
import BottomBar from '@/components/bottomBar/bottomBar';
import UploadImg from '@/components/buttons/uploadImg';
import TagAI from '@/components/buttons/tagAI';

export default function CreateThreadScreen() {
    const { theme } = useTheme();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    
    const currentUsername = "Innocentia"; 

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Header title="New Thread" />

                <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
                    {/* 2. Topic Selector */}
                    <View style={styles.topicSelector}>
                        <Text style={[styles.topicText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                            {isAnonymous ? 'anonymous' : currentUsername}
                        </Text>
                        <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} style={styles.topicIcon} />
                        <TouchableOpacity>
                            <Text style={[styles.topicText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                                Topics
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* 3. Title Input */}
                    <TextInput
                        style={[styles.titleInput, { color: theme.colors.textPrimary, borderColor: theme.colors.textSecondary + '33', fontFamily: theme.fonts.montserrat }]}
                        placeholder="Title"
                        placeholderTextColor={theme.colors.textSecondary}
                        value={title}
                        onChangeText={setTitle}
                    />

                    {/* 4. Body Input / Rich Text Area */}
                    <TextInput
                        style={[styles.contentInput, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]}
                        placeholder={`Before you post, please make sure to:\n1. Add a clear title that describe your question.\n2. Add all required option below (Course name and Topic)\n3. Write a detailed description of your issue\n\nNote: Screenshots are welcome, but please do not posts full assignment.`}
                        placeholderTextColor={theme.colors.textSecondary}
                        multiline
                        textAlignVertical="top"
                        value={content}
                        onChangeText={setContent}
                    />

                    {/* 5. Toolbar */}
                    <View style={styles.toolbar}>
                        <UploadImg onPress={() => console.log('Upload image pressed')} />
                        <TagAI />
                    </View>
                </ScrollView>

                <BottomBar
                    isAnonymous={isAnonymous}
                    onToggleAnonymous={setIsAnonymous}
                    disabled={title.trim().length === 0}
                    onPressPost={() => console.log('Submit to Controller')}
                />

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    container: { flex: 1 },
    
    scrollView: { flex: 1, paddingHorizontal: 16 },
    topicSelector: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 12 },
    topicText: { fontSize: 14, fontWeight: '600' },
    topicIcon: { marginHorizontal: 8 },
    titleInput: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, paddingVertical: 12, marginBottom: 16 },
    contentInput: { fontSize: 14, minHeight: 200, lineHeight: 22 },
    toolbar: { flexDirection: 'row', marginTop: 16, marginBottom: 32 },
    toolbarIcon: { marginRight: 16 },
});