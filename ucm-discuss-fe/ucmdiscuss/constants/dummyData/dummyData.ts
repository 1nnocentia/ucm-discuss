import { UserHistory, ProfileCardData, TopicsData, Post, NotificationProps, AuthorSnippet, ThreadComment } from '@/models/user';


export const dummyHistoryData: UserHistory[] = [
    {
        type: 'post',
        id: "1",
        title: "Sample Post Title",
        createdAt: "11 Mei 2026",
        votesCount: 10,
        commentCount: 5,
    },
    {
        type: 'comment',
        id: "2",
        postId: "1",
        content: "This is a sample comment content that the user has made on a post.",
        parentPostTitle: "Sample Post Title",
        createdAt: "12 Mei 2026",
        votesCount: 15,
        commentCount: 8,
    }
];

export const dummyProfileData: ProfileCardData = {
    name: "Innocentia",
    nim: "0806022410010",
    major: "AI",
    faculty: "IMT",
    votesCount: 10,
    headerImage: undefined,
    postCount: 5,
    commentCount: 3,
    isAnonymous: false
}

export const TopicsDummyData: TopicsData[] = [
    {
        id: '1',
        name: 'Artificial Intelligence',
        description: 'Discussions on Machine Learning, Neural Networks, and GenAI implementations.',
        status: 'current',
        discussionCount: 142
    },
    {
        id: '2',
        name: 'Mobile Development',
        description: 'React Native, Flutter, and native Android/iOS development challenges.',
        status: 'current',
        discussionCount: 89
    },
    {
        id: '3',
        name: 'Database Systems',
        description: 'SQL queries, relational algebra, and NoSQL architecture.',
        status: 'past',
        discussionCount: 210
    },
    {
        id: '4',
        name: 'Algorithm Design',
        description: 'Competitive programming, big-O notation, and data structures.',
        status: 'past',
        discussionCount: 305
    },
    {
        id: '5',
        name: 'Software Engineering',
        description: 'Clean Architecture, SDLC, and Agile methodologies.',
        status: 'current',
        discussionCount: 56
    }
];

const dummyUser1: AuthorSnippet = {
    id: 'user-001',
    name: 'Han Inno',
    isAnonymous: false,
};

const dummyUser2: AuthorSnippet = {
    id: 'user-002',
    name: 'Mifey',
    isAnonymous: false,
};

const dummyUser3: AuthorSnippet = {
    id: 'user-003',
    name: 'Avin',
    isAnonymous: false,
};

const dummyUser4: AuthorSnippet = {
    id: 'user-004',
    name: 'Gibert',
    isAnonymous: false,
};

export const dummyHomePosts: Post[] = [
    {
        id: 'post-001',
        title: 'Info jadwal pengisian KRS semester ganjil tahun ini dong?',
        createdAt: '14 Mei 2026',
        votes: 42,
        comments: 8,
        image: null,
        description: 'Ada yang tau kapan persisnya KRS-an dibuka? Takut kehabisan slot kelas nih.',
        topic: TopicsDummyData[0],
        user: dummyUser1,
        userVoteStatus: true,
    },
    {
        id: 'post-002',
        title: 'Sharing: Pengalaman styling pakai Material 3 di React Native',
        createdAt: '15 Mei 2026',
        votes: 85,
        comments: 14,
        image: 'https://dummyimage.com/600x400/000/fff&text=Material+3+RN',
        description: 'Buat temen-temen Informatika UCM yang lagi build app pakai RN, ini sedikit tips biar UI/UX nya tetep konsisten. Clean code is poetry!',
        topic: TopicsDummyData[4],
        user: dummyUser1,
        userVoteStatus: false,
    },
    {
        id: 'post-003',
        title: 'Parkiran motor kampus hari ini penuh banget nggak ya?',
        createdAt: '15 Mei 2026',
        votes: 12,
        comments: 5,
        image: null,
        description: null,
        topic: TopicsDummyData[2],
        user: dummyUser2,
        userVoteStatus: undefined,
    }
];

export const threadDetailPost: Post = dummyHomePosts[1];

export const dummyThreadComments: ThreadComment[] = [
    {
        id: 'comment-101',
        postId: 'post-002',
        parentPostId: 'post-002',
        image: null,
        content: 'Wah mantap Inno, kebetulan lagi nyari referensi buat implementasi dark mode juga. Boleh share repo-nya nggak?',
        createdAt: '15 Mei 2026',
        votes: 15,
        user: dummyUser2,
        userVoteStatus: true,
        replies: [
            {
                id: 'comment-101-reply-1',
                postId: 'post-002',
                parentPostId: 'comment-101',
                image: null,
                content: 'Siapp Mifey, nanti aku push ke GitHub ya. Kodenya kubuat serapih mungkin biar gampang dibaca.',
                createdAt: '15 Mei 2026',
                votes: 5,
                user: dummyUser1,
                userVoteStatus: undefined,
                replies: []
            }
        ]
    },
    {
        id: 'comment-102',
        postId: 'post-002',
        parentPostId: 'post-002',
        image: null,
        content: 'Info yang sangat daging! Makasih sharingnya bro.',
        createdAt: '15 Mei 2026',
        votes: 8,
        user: {
            id: 'user-003',
            name: 'Andi',
            isAnonymous: false
        },
        userVoteStatus: false,
        replies: []
    }
];


export const dummyNotifications: NotificationProps[] = [
    {
        id: 'notif-001',
        actorName: 'Mifey',
        actionType: 'reply_post',
        targetSnippet: 'Sharing: Pengalaman styling pakai Material 3...',
        createdAt: '10 menit yang lalu',
        isRead: false
    },
    {
        id: 'notif-002',
        actorName: 'Andi',
        actionType: 'reply_comment',
        targetSnippet: 'Wah mantap Han, kebetulan lagi nyari referensi...',
        createdAt: '1 jam yang lalu',
        isRead: false
    },
    {
        id: 'notif-003',
        actorName: 'Anonymous',
        actionType: 'vote',
        targetSnippet: 'Info jadwal pengisian KRS semester ganjil...',
        createdAt: 'Kemarin',
        isRead: false
    },
    {
        id: 'notif-004',
        actorName: 'Budi',
        actionType: 'reply_post',
        targetSnippet: 'Review dosen matkul Machine Learning...',
        createdAt: '2 hari yang lalu',
        isRead: false
    }
];

export const MOCK_POST: Post = {
    id: '1',
    title: 'Bagaimana cara mengatasi error ADB saat debugging React Native?',
    description: 'Saya mencoba menjalankan aplikasi di emulator Android, tetapi Metro bundler terus menampilkan error "ADB.exe is not recognized". Apakah ada yang tahu cara memperbaiki path environment-nya?',
    image: null,
    createdAt: '2h ago',
    votes: 45,
    comments: 2,
    userVoteStatus: false,
    topic: { id: 't1', name: 'Mobile Development' },
    user: {
        id: 'u1',
        name: 'Innocentia',
        isAnonymous: false
    },
};

// export const MOCK_COMMENTS: ThreadComment[] = [
//     {
//         id: 'c1',
//         content: 'Coba periksa Environment Variables di Windows kamu...',
//         createdAt: '1h ago',
//         votes: 12,
//         user: dummyUser2,
//         image: null,
//         userVoteStatus: false,
//         replies: [
//             {
//                 id: 'r1',
//                 postId: '1',
//                 parentPostId: 'c1',
//                 content: 'Terima kasih! Ternyata memang path-nya belum di set.',
//                 createdAt: '30m ago',
//                 votes: 3,
//                 image: null,
//                 user: dummyUser1
//             }
//         ]
//     },
//     {
//         id: 'c2',
//         text: 'Setuju dengan komentar di atas. Atau kalau pakai Expo...',
//         createdAt: '45m ago',
//         votes: 5,
//         user: { name: 'anonymous',  isAnonymous: true }
//     }
// ];

export const MOCK_TOPIC_INFO = {
    id: '1',
    name: 'Artificial Intelligence',
    description: 'The official community for AI enthusiasts at UCM. Discuss Machine Learning, Neural Networks, GenAI implementations, and the philosophical impact of AI on society.',
    membersCount: '1.2k',
    onlineCount: '42',
    bannerUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1080&auto=format&fit=crop', 
    iconUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=200&auto=format&fit=crop',
    isJoined: false
};
export const MOCK_TOPIC_POSTS: Post[] = Array(15).fill(0).map((_, i) => ({
    id: `p${i}`,
    title: `Discussing the implications of GPT-5 in our current curriculum ${i+1}`,
    description: 'With the recent announcements, how should we adapt our final projects to leverage these new capabilities without violating academic integrity?',
    image: null,
    createdAt: `${i + 2}h ago`, 
    votes: 120 - (i * 10),
    comments: 24,
    topic: { 
        id: '1',
        name: 'Artificial Intelligence' 
    },
    user: { 
        id: 'user-001',
        name: 'Innocentia', 
        isAnonymous: false 
    },
    userVoteStatus: false,
}));