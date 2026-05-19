// import { UserHistory, ProfileCardData, TopicsData, Post, NotificationProps, AuthorSnippet, ThreadComment } from '@/models/user';

import { 
    AuthorSnippet, TopicsData, Post, ThreadComment, 
    ProfileCardData, UserHistory, NotificationProps 
} from '@/models/user';

// ==========================================
// 1. BASE ENTITIES (Single Source of Truth)
// ==========================================

export const USERS = {
    current: { id: 'u-001', name: 'Han Inno', isAnonymous: false } as AuthorSnippet,
    peer1: { id: 'u-002', name: 'Mifey', isAnonymous: false } as AuthorSnippet,
    peer2: { id: 'u-003', name: 'Andi', isAnonymous: false } as AuthorSnippet,
    anon1: { id: 'u-a01', name: 'Anonymous', isAnonymous: true } as AuthorSnippet,
    anon2: { id: 'u-a02', name: 'Anonymous', isAnonymous: true } as AuthorSnippet,
};

export const TOPICS: TopicsData[] = [
    { id: 't-001', name: 'Artificial Intelligence', description: 'Discussions on ML, Neural Networks, and GenAI implementations.', status: 'current', discussionCount: 142 },
    { id: 't-002', name: 'Mobile Development', description: 'React Native, Flutter, and native Android/iOS challenges.', status: 'current', discussionCount: 89 },
    { id: 't-003', name: 'Database Systems', description: 'SQL queries, relational algebra, and NoSQL architecture.', status: 'past', discussionCount: 210 },
    { id: 't-004', name: 'Algorithm Design', description: 'Competitive programming, big-O notation, and DP.', status: 'past', discussionCount: 305 },
    { id: 't-005', name: 'Software Engineering', description: 'Clean Architecture, SDLC, and Agile methodologies.', status: 'current', discussionCount: 56 },
    { id: 't-006', name: 'Cyber Security', description: 'Penetration testing, cryptography, and network security.', status: 'current', discussionCount: 34 },
];

// ==========================================
// 2. POSTS (Feed Data)
// ==========================================

export const MOCK_POSTS: Post[] = [
    {
        id: 'p-001',
        title: 'Sharing: Pengalaman styling pakai Material 3 di React Native',
        description: 'Buat temen-temen Informatika UCM yang lagi build app pakai RN, ini sedikit tips biar UI/UX nya tetep konsisten. Clean code is poetry! Jangan lupa pakai Context buat theme management.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop', // Realistic image
        createdAt: '19 Mei 2026',
        votes: 128,
        comments: 14,
        topic: { id: TOPICS[1].id, name: TOPICS[1].name },
        user: USERS.current,
        userVoteStatus: true,
    },
    {
        id: 'p-002',
        title: 'Bagaimana cara mengatasi error ADB saat debugging di emulator?',
        description: 'Metro bundler terus menampilkan error "ADB.exe is not recognized". Apakah environment variables di Windows perlu di-setting ulang?',
        image: null, // Edge case: No image
        createdAt: '2h ago',
        votes: 45,
        comments: 4,
        topic: { id: TOPICS[1].id, name: TOPICS[1].name },
        user: USERS.peer1,
        userVoteStatus: false,
    },
    {
        id: 'p-003',
        title: 'SIAKAD lambat banget kalau lagi masa KRS-an',
        description: 'Tiap semester pasti begini. Harusnya query databasenya bisa dioptimasi atau pakai Redis caching nggak sih? Ada yang paham arsitektur backend kampus kita?',
        image: null,
        createdAt: '3h ago',
        votes: 215,
        comments: 42,
        topic: { id: TOPICS[2].id, name: TOPICS[2].name },
        user: USERS.anon1, // Edge case: Anonymous poster
        userVoteStatus: undefined,
    },
    {
        id: 'p-004',
        title: 'Help DP Problem - Knapsack',
        description: null, // Edge case: Null description (title only)
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600&auto=format&fit=crop',
        createdAt: '5h ago',
        votes: 12,
        comments: 0, // Edge case: No comments
        topic: { id: TOPICS[3].id, name: TOPICS[3].name },
        user: USERS.peer2,
        userVoteStatus: false,
    },
    {
        id: 'p-005',
        title: 'GPT-5 sebentar lagi rilis, relevansi tugas akhir kita gimana?',
        description: 'Dengan kapabilitas penalaran logika yang baru, apakah dosen-dosen akan mengubah standar rubrik penilaian untuk project AI kita semester depan? Let\'s discuss.',
        image: null,
        createdAt: '1 hari yang lalu',
        votes: 89,
        comments: 12,
        topic: { id: TOPICS[0].id, name: TOPICS[0].name },
        user: USERS.anon2,
        userVoteStatus: true,
    }
];

// ==========================================
// 3. COMMENTS (Deep Threading Simulation)
// ==========================================
// Focusing on p-001 to test nested UI rendering

export const MOCK_THREAD_COMMENTS: ThreadComment[] = [
    {
        id: 'c-001',
        postId: 'p-001',
        parentPostId: null,
        content: 'Wah mantap Inno, kebetulan lagi nyari referensi buat implementasi dark mode juga. Boleh share repo-nya nggak?',
        image: null,
        createdAt: '19 Mei 2026',
        votes: 15,
        user: USERS.peer1,
        userVoteStatus: true,
        replies: [
            {
                id: 'c-001-r1',
                postId: 'p-001',
                parentPostId: 'c-001',
                content: 'Siapp Mifey, nanti aku push ke GitHub ya. Kodenya kubuat serapih mungkin biar gampang dibaca.',
                image: null,
                createdAt: '19 Mei 2026',
                votes: 5,
                user: USERS.current,
                userVoteStatus: undefined,
                replies: []
            },
            {
                id: 'c-001-r2',
                postId: 'p-001',
                parentPostId: 'c-001',
                content: 'Ikut nyimak link repo-nya bang.',
                image: null,
                createdAt: '19 Mei 2026',
                votes: 2,
                user: USERS.anon1, // Anon reply
                userVoteStatus: false,
                replies: []
            }
        ]
    },
    {
        id: 'c-002',
        postId: 'p-001',
        parentPostId: null,
        content: 'Info yang sangat daging! Makasih sharingnya bro. Kalau disbanding native development gimana performance-nya?',
        image: null,
        createdAt: '18 Mei 2026',
        votes: 8,
        user: USERS.peer2,
        userVoteStatus: false,
        replies: [
            {
                id: 'c-002-r1',
                postId: 'p-001',
                parentPostId: 'c-002',
                content: 'Selama kita hindari re-render nggak perlu dan optimasi FlashList, feel-nya 99% mirip native kok.',
                image: null,
                createdAt: '18 Mei 2026',
                votes: 12,
                user: USERS.current,
                userVoteStatus: true,
            }
        ]
    }
];

// ==========================================
// 4. NOTIFICATIONS, PROFILE & HISTORY
// ==========================================

export const MOCK_NOTIFICATIONS: NotificationProps[] = [
    { id: 'n-001', actorName: USERS.peer1.name, actionType: 'reply_post', targetSnippet: 'Sharing: Pengalaman styling pakai Material 3...', createdAt: '10 menit yang lalu', isRead: false },
    { id: 'n-002', actorName: 'Anonymous', actionType: 'vote', targetSnippet: 'SIAKAD lambat banget kalau lagi masa KRS-an', createdAt: '1 jam yang lalu', isRead: false },
    { id: 'n-003', actorName: USERS.peer2.name, actionType: 'reply_comment', targetSnippet: 'Wah mantap Inno, kebetulan lagi nyari...', createdAt: 'Kemarin', isRead: true },
    { id: 'n-004', actorName: USERS.anon2.name, actionType: 'reply_post', targetSnippet: 'Bagaimana cara mengatasi error ADB...', createdAt: '2 hari yang lalu', isRead: true },
];

export const MOCK_PROFILE: ProfileCardData = {
    name: USERS.current.name,
    nim: "0806022410010",
    major: "Informatics",
    faculty: "IMT",
    votesCount: 428,
    headerImage: undefined, 
    postCount: 15,
    commentCount: 84,
    isAnonymous: false
};

export const MOCK_HISTORY: UserHistory[] = [
    { type: 'post', id: 'p-001', title: 'Sharing: Pengalaman styling pakai Material 3 di React Native', createdAt: '19 Mei 2026', votesCount: 128, commentCount: 14 },
    { type: 'comment', id: 'c-001-r1', postId: 'p-001', parentPostTitle: 'Sharing: Pengalaman styling pakai Material 3...', content: 'Siapp Mifey, nanti aku push ke GitHub ya.', createdAt: '19 Mei 2026', votesCount: 5, commentCount: 0 },
];


// export const dummyHistoryData: UserHistory[] = [
//     {
//         type: 'post',
//         id: "1",
//         title: "Sample Post Title",
//         createdAt: "11 Mei 2026",
//         votesCount: 10,
//         commentCount: 5,
//     },
//     {
//         type: 'comment',
//         id: "2",
//         postId: "1",
//         content: "This is a sample comment content that the user has made on a post.",
//         parentPostTitle: "Sample Post Title",
//         createdAt: "12 Mei 2026",
//         votesCount: 15,
//         commentCount: 8,
//     }
// ];

// export const dummyProfileData: ProfileCardData = {
//     name: "Innocentia",
//     nim: "0806022410010",
//     major: "AI",
//     faculty: "IMT",
//     votesCount: 10,
//     headerImage: undefined,
//     postCount: 5,
//     commentCount: 3,
//     isAnonymous: false
// }

// export const TopicsDummyData: TopicsData[] = [
//     {
//         id: '1',
//         name: 'Artificial Intelligence',
//         description: 'Discussions on Machine Learning, Neural Networks, and GenAI implementations.',
//         status: 'current',
//         discussionCount: 142
//     },
//     {
//         id: '2',
//         name: 'Mobile Development',
//         description: 'React Native, Flutter, and native Android/iOS development challenges.',
//         status: 'current',
//         discussionCount: 89
//     },
//     {
//         id: '3',
//         name: 'Database Systems',
//         description: 'SQL queries, relational algebra, and NoSQL architecture.',
//         status: 'past',
//         discussionCount: 210
//     },
//     {
//         id: '4',
//         name: 'Algorithm Design',
//         description: 'Competitive programming, big-O notation, and data structures.',
//         status: 'past',
//         discussionCount: 305
//     },
//     {
//         id: '5',
//         name: 'Software Engineering',
//         description: 'Clean Architecture, SDLC, and Agile methodologies.',
//         status: 'current',
//         discussionCount: 56
//     }
// ];

// const dummyUser1: AuthorSnippet = {
//     id: 'user-001',
//     name: 'Han Inno',
//     isAnonymous: false,
// };

// const dummyUser2: AuthorSnippet = {
//     id: 'user-002',
//     name: 'Mifey',
//     isAnonymous: false,
// };

// const dummyUser3: AuthorSnippet = {
//     id: 'user-003',
//     name: 'Avin',
//     isAnonymous: false,
// };

// const dummyUser4: AuthorSnippet = {
//     id: 'user-004',
//     name: 'Gibert',
//     isAnonymous: false,
// };

// export const dummyHomePosts: Post[] = [
//     {
//         id: 'post-001',
//         title: 'Info jadwal pengisian KRS semester ganjil tahun ini dong?',
//         createdAt: '14 Mei 2026',
//         votes: 42,
//         comments: 8,
//         image: null,
//         description: 'Ada yang tau kapan persisnya KRS-an dibuka? Takut kehabisan slot kelas nih.',
//         topic: TopicsDummyData[0],
//         user: dummyUser1,
//         userVoteStatus: true,
//     },
//     {
//         id: 'post-002',
//         title: 'Sharing: Pengalaman styling pakai Material 3 di React Native',
//         createdAt: '15 Mei 2026',
//         votes: 85,
//         comments: 14,
//         image: 'https://dummyimage.com/600x400/000/fff&text=Material+3+RN',
//         description: 'Buat temen-temen Informatika UCM yang lagi build app pakai RN, ini sedikit tips biar UI/UX nya tetep konsisten. Clean code is poetry!',
//         topic: TopicsDummyData[4],
//         user: dummyUser1,
//         userVoteStatus: false,
//     },
//     {
//         id: 'post-003',
//         title: 'Parkiran motor kampus hari ini penuh banget nggak ya?',
//         createdAt: '15 Mei 2026',
//         votes: 12,
//         comments: 5,
//         image: null,
//         description: null,
//         topic: TopicsDummyData[2],
//         user: dummyUser2,
//         userVoteStatus: undefined,
//     }
// ];

// export const threadDetailPost: Post = dummyHomePosts[1];

// export const dummyThreadComments: ThreadComment[] = [
//     {
//         id: 'comment-101',
//         postId: 'post-002',
//         parentPostId: 'post-002',
//         image: null,
//         content: 'Wah mantap Inno, kebetulan lagi nyari referensi buat implementasi dark mode juga. Boleh share repo-nya nggak?',
//         createdAt: '15 Mei 2026',
//         votes: 15,
//         user: dummyUser2,
//         userVoteStatus: true,
//         replies: [
//             {
//                 id: 'comment-101-reply-1',
//                 postId: 'post-002',
//                 parentPostId: 'comment-101',
//                 image: null,
//                 content: 'Siapp Mifey, nanti aku push ke GitHub ya. Kodenya kubuat serapih mungkin biar gampang dibaca.',
//                 createdAt: '15 Mei 2026',
//                 votes: 5,
//                 user: dummyUser1,
//                 userVoteStatus: undefined,
//                 replies: []
//             }
//         ]
//     },
//     {
//         id: 'comment-102',
//         postId: 'post-002',
//         parentPostId: 'post-002',
//         image: null,
//         content: 'Info yang sangat daging! Makasih sharingnya bro.',
//         createdAt: '15 Mei 2026',
//         votes: 8,
//         user: {
//             id: 'user-003',
//             name: 'Andi',
//             isAnonymous: false
//         },
//         userVoteStatus: false,
//         replies: []
//     }
// ];


// export const dummyNotifications: NotificationProps[] = [
//     {
//         id: 'notif-001',
//         actorName: 'Mifey',
//         actionType: 'reply_post',
//         targetSnippet: 'Sharing: Pengalaman styling pakai Material 3...',
//         createdAt: '10 menit yang lalu',
//         isRead: false
//     },
//     {
//         id: 'notif-002',
//         actorName: 'Andi',
//         actionType: 'reply_comment',
//         targetSnippet: 'Wah mantap Han, kebetulan lagi nyari referensi...',
//         createdAt: '1 jam yang lalu',
//         isRead: false
//     },
//     {
//         id: 'notif-003',
//         actorName: 'Anonymous',
//         actionType: 'vote',
//         targetSnippet: 'Info jadwal pengisian KRS semester ganjil...',
//         createdAt: 'Kemarin',
//         isRead: false
//     },
//     {
//         id: 'notif-004',
//         actorName: 'Budi',
//         actionType: 'reply_post',
//         targetSnippet: 'Review dosen matkul Machine Learning...',
//         createdAt: '2 hari yang lalu',
//         isRead: false
//     }
// ];

// export const MOCK_POST: Post = {
//     id: '1',
//     title: 'Bagaimana cara mengatasi error ADB saat debugging React Native?',
//     description: 'Saya mencoba menjalankan aplikasi di emulator Android, tetapi Metro bundler terus menampilkan error "ADB.exe is not recognized". Apakah ada yang tahu cara memperbaiki path environment-nya?',
//     image: null,
//     createdAt: '2h ago',
//     votes: 45,
//     comments: 2,
//     userVoteStatus: false,
//     topic: { id: 't1', name: 'Mobile Development' },
//     user: {
//         id: 'u1',
//         name: 'Innocentia',
//         isAnonymous: false
//     },
// };


// export const MOCK_TOPIC_INFO = {
//     id: '1',
//     name: 'Artificial Intelligence',
//     description: 'The official community for AI enthusiasts at UCM. Discuss Machine Learning, Neural Networks, GenAI implementations, and the philosophical impact of AI on society.',
//     membersCount: '1.2k',
//     onlineCount: '42',
//     bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1080&auto=format&fit=crop', 
//     iconUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=200&auto=format&fit=crop',
//     isJoined: false
// };
// export const MOCK_TOPIC_POSTS: Post[] = Array(15).fill(0).map((_, i) => ({
//     id: `p${i}`,
//     title: `Discussing the implications of GPT-5 in our current curriculum ${i+1}`,
//     description: 'With the recent announcements, how should we adapt our final projects to leverage these new capabilities without violating academic integrity?',
//     image: null,
//     createdAt: `${i + 2}h ago`, 
//     votes: 120 - (i * 10),
//     comments: 24,
//     topic: { 
//         id: '1',
//         name: 'Artificial Intelligence' 
//     },
//     user: { 
//         id: 'user-001',
//         name: 'Innocentia', 
//         isAnonymous: false 
//     },
//     userVoteStatus: false,
// }));