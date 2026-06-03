import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '@/components/header/header';
import CommentItem from '@/components/threadDiscussion/contentItem';
import DetailedThreadCard from '@/components/threadCard/detailedThreadCard';
import TypingSpace, { TypingSpaceRef } from '@/components/input/typingSpace';
import { CreateCommentInput, Post, ThreadComment } from '@/models/user';
import { ApiService } from '@/controllers/services/apiService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ThreadProps = {
    routeId?: string;
    routerProp?: { back: () => void };
    themeOverride?: any;
};

export function ThreadDiscussionScreen({ routeId, routerProp, themeOverride }: ThreadProps) {
    const themeCtx = useTheme();
    const { theme } = themeOverride ?? themeCtx;
    const router = routerProp ?? useRouter();
    const queryClient = useQueryClient();

    const { id: paramId, focusInput } = useLocalSearchParams<{ id: string; focusInput?: string }>();

    const postId = routeId || (paramId as string);

    const typingSpaceRef = useRef<TypingSpaceRef>(null);

    const [replyingTo, setReplyingTo] = useState<string | undefined>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['thread', postId],
        queryFn: async () => {
            const [post, comments] = await Promise.all([
                ApiService.getPostDetail(postId as string),
                ApiService.getComments(postId as string),
            ]);
            return { post: post as Post | null, comments: comments as ThreadComment[] };
        },
        enabled: !!postId,
    });

    const submitCommentMutation = useMutation({
        mutationFn: async (payload: CreateCommentInput) => {
            return ApiService.createComment(payload);
        },
        onMutate: async (newCommentPayload) => {
            await queryClient.cancelQueries({ queryKey: ['thread', postId] });

            const previousData = queryClient.getQueryData(['thread', postId]) as { post: Post | null; comments: ThreadComment[] } | undefined;

            queryClient.setQueryData(['thread', postId], (old: { post: Post | null; comments: ThreadComment[] } | undefined) => {
                if (!old) return old;

                const optimisticComment: ThreadComment = {
                    id: `optimistic-${Date.now()}`,
                    postId: newCommentPayload.postId,
                    parentPostId: newCommentPayload.parentCommentId || null,
                    content: newCommentPayload.content,
                    image: newCommentPayload.image || null,
                    createdAt: 'Now',
                    votes: 0,
                    user: { id: 'current-user', name: 'You', isAnonymous: newCommentPayload.isAnonymous },
                    replies: [],
                };

                if (!newCommentPayload.parentCommentId) {
                    return {
                        ...old,
                        comments: [optimisticComment, ...old.comments],
                    };
                }

                const appendReply = (list: ThreadComment[]): ThreadComment[] =>
                    list.map((comment) => {
                        if (comment.id === newCommentPayload.parentCommentId) {
                            return {
                                ...comment,
                                replies: [...(comment.replies || []), optimisticComment],
                            };
                        }
                        if (comment.replies && comment.replies.length > 0) {
                            return {
                                ...comment,
                                replies: appendReply(comment.replies),
                            };
                        }
                        return comment;
                    });

                return {
                    ...old,
                    comments: appendReply(old.comments),
                };
            });

            return { previousData };
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(['thread', postId], context?.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['thread', postId] });
        },
    });

    const handleCommentPress = () => {
        typingSpaceRef.current?.focusInput();
        setReplyingTo(undefined);
    };

    const handleReplyPress = (commentId: string, imageUri: string | null) => {
        console.log("Trigger reply ke komentar ID:", commentId);
        setReplyingTo(commentId);
        typingSpaceRef.current?.focusInput();
    };

    const handleCancelReply = () => {
        setReplyingTo(undefined);
    };

    const renderComment = ({ item }: { item: ThreadComment }) => (
        <CommentItem comment={item} onReplyPress={handleReplyPress} />
    );

    const handleSendComment = async (commentText: string, imageUri?: string | null) => {
        if (!postId) return;

        const payload: CreateCommentInput = {
            postId,
            parentCommentId: replyingTo || null,
            content: commentText,
            image: imageUri || null,
            isAnonymous: false,
        };

        submitCommentMutation.mutate(payload, {
            onSuccess: () => {
                typingSpaceRef.current?.clearInput();
                setReplyingTo(undefined);
                typingSpaceRef.current?.setReplyingTo(undefined);
            },
            onError: (error) => {
                console.error('Error submitting comment:', error);
            },
        });
    };

    useEffect(() => {
        if (focusInput === 'true') {
            typingSpaceRef.current?.focusInput();
            setReplyingTo(undefined);
        }
    }, [focusInput]);

    const post = data?.post ?? null;
    const comments = data?.comments ?? [];

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
                <Header title="Discussion" />
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
                <Header title="Discussion" />
                <View style={styles.centerContainer}>
                    <Text style={{ color: theme.colors.textSecondary }}>Failed to load thread.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <Header title="Discussion" />

                <FlatList
                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderComment}
                    ListHeaderComponent={post ? <DetailedThreadCard post={post as any} onCommentPress={handleCommentPress} /> : null}
                    ListEmptyComponent={
                        <View style={styles.centerContainer}>
                            <Text style={{ color: theme.colors.textSecondary }}>No comments yet.</Text>
                        </View>
                    }
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                />

                <TypingSpace
                    ref={typingSpaceRef}
                    replyingTo={replyingTo}
                    onSendComment={handleSendComment}
                    onCancelReply={handleCancelReply}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }

});