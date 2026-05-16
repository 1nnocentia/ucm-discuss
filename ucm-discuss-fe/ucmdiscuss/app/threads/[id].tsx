import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '@/components/header/header';
import CommentItem from '@/components/threadDiscussion/contentItem';
import DetailedThreadCard from '@/components/threadCard/detailedThreadCard';
import TypingSpace, { TypingSpaceRef } from '@/components/input/typingSpace';
import { MOCK_COMMENTS, MOCK_POST } from '@/constants/dummyData/dummyData';

type ThreadProps = {
    routeId?: string;
    routerProp?: { back: () => void };
    themeOverride?: any;
};

export function ThreadDiscussionScreen({ routeId, routerProp, themeOverride }: ThreadProps) {
    const themeCtx = useTheme();
    const { theme } = themeOverride ?? themeCtx;
    const router = routerProp ?? useRouter();
    const params = routeId ? { id: routeId } : useLocalSearchParams();
    const { id, focusInput } = useLocalSearchParams();
    const typingSpaceRef = useRef<TypingSpaceRef>(null);
    const inputRef = useRef<TextInput>(null);
    const [replyingTo, setReplyingTo] = useState<string | undefined>();

    const handleCommentPress = () => {
        typingSpaceRef.current?.focusInput();
        setReplyingTo(undefined);
    };

    const handleReplyPress = (commentId: string) => {
        console.log("Trigger reply ke komentar ID:", commentId);
        setReplyingTo(commentId);
        typingSpaceRef.current?.setReplyingTo(commentId);
        typingSpaceRef.current?.focusInput();
    };

    const renderComment = ({ item }: { item: typeof MOCK_COMMENTS[0] }) => (
        <CommentItem comment={item} onReplyPress={handleReplyPress} />
    );

     useEffect(() => {
        if (focusInput === 'true') {
            typingSpaceRef.current?.focusInput();
            setReplyingTo(undefined);
        }
    }, [focusInput]);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <Header title="Discussion" />


                <FlatList
                    data={MOCK_COMMENTS}
                    keyExtractor={(item) => item.id}
                    renderItem={renderComment}
                    ListHeaderComponent={<DetailedThreadCard post={MOCK_POST} onCommentPress={handleCommentPress} />}
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                />

                <TypingSpace
                    ref={typingSpaceRef}
                    replyingTo={replyingTo}
                    onSendComment={(commentText) => console.log('Kirim komentar ke Controller:', commentText)}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export const TEST_MOCK_POST = MOCK_POST;
export const TEST_MOCK_COMMENTS = MOCK_COMMENTS;

export default ThreadDiscussionScreen;

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1 
    },
    container: { 
        flex: 1 
    },

    listContent: { 
        paddingBottom: 24 
    },

    commentContainer: { 
        flexDirection: 'row', 
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        borderBottomWidth: 0.5 
    },
    commentLeft: { 
        alignItems: 'center', 
        marginRight: 12, 
        width: 32 
    },

});