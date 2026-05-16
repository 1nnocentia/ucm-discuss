// import React from 'react';
// import { StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useTheme } from '@/context/ThemeContext';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import Header from '@/components/header/header';
// import CommentItem from '@/components/threadDiscussion/contentItem';
// import DetailedThreadCard from '@/components/threadCard/detailedThreadCard';
// import TypingSpace from '@/components/input/typingSpace';
// import { MOCK_COMMENTS, MOCK_POST } from '@/constants/dummyData/dummyData';

// type ThreadProps = {
//     routeId?: string;
//     routerProp?: { back: () => void };
//     themeOverride?: any;
// };

// export function ThreadDiscussionScreen({ routeId, routerProp, themeOverride }: ThreadProps) {
//     const themeCtx = useTheme();
//     const { theme } = themeOverride ?? themeCtx;
//     const router = routerProp ?? useRouter();
//     const params = routeId ? { id: routeId } : useLocalSearchParams();
//     const { id } = params ?? {};

//     const handleReplyPress = (commentId: string) => {
//         console.log("Trigger reply ke komentar ID:", commentId);
//         // UX Idea: Fokuskan text input dan ubah placeholder menjadi "Replying to..."
//     };

//     const renderComment = ({ item }: { item: typeof MOCK_COMMENTS[0] }) => (
//         <CommentItem comment={item} onReplyPress={handleReplyPress} />
//     );

//     return (
//         <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
//             <KeyboardAvoidingView 
//                 style={styles.container} 
//                 behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                 keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//             >
//                 <Header title="Discussion" />


//                 <FlatList
//                     data={MOCK_COMMENTS}
//                     keyExtractor={(item) => item.id}
//                     renderItem={renderComment}
//                     ListHeaderComponent={<DetailedThreadCard post={MOCK_POST} />}
//                     contentContainerStyle={styles.listContent}
//                     keyboardShouldPersistTaps="handled"
//                 />

//                 <TypingSpace onSendComment={(commentText) => console.log('Kirim komentar ke Controller:', commentText)} />
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

// export const TEST_MOCK_POST = MOCK_POST;
// export const TEST_MOCK_COMMENTS = MOCK_COMMENTS;

// export default ThreadDiscussionScreen;

// const styles = StyleSheet.create({
//     safeArea: { flex: 1 },
//     container: { flex: 1 },

//     listContent: { paddingBottom: 24 },

//     // Comment Styles
//     commentContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 0.5 },
//     commentLeft: { alignItems: 'center', marginRight: 12, width: 32 },
//     avatarComment: { width: 32, height: 32, borderRadius: 16 },
//     avatarPlaceholderComment: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
//     commentThreadLine: { width: 2, flex: 1, marginTop: 8, borderRadius: 1 },
//     commentRight: { flex: 1 },
//     commentHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
//     commentAuthor: { fontSize: 14, fontWeight: 'bold' },
//     commentText: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
//     commentActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
//     replyButton: { paddingVertical: 4 },
//     replyText: { fontSize: 13, fontWeight: '600' },

// });