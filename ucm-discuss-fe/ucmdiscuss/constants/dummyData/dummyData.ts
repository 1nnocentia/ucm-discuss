import { UserHistory, ProfileCardData, Topics, TopicsData, Post, PostHistory, User, ThreadComment, NotificationProps } from '@/models/user';


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
}

// export const TopicsDummyData : Topics[] = [
//     { id: '1', name: 'Software Engineering' },
//     { id: '2', name: 'Artificial Intelligence' },
//     { id: '3', name: 'Information Management' },
//     { id: '4', name: 'Computer Networks' },
// ]

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

const dummyUser1: User = {
    id: 'user-001',
    email: 'han@student.ciputra.ac.id',
    isStudent: true,
    nim: '20230001',
    name: 'Han Inno'
};

const dummyUser2: User = {
    id: 'user-002',
    email: 'mifey@student.ciputra.ac.id',
    isStudent: true,
    nim: '20230002',
    name: 'Mifey'
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
        isAnonymous: true
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
        isAnonymous: false
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
        isAnonymous: false
    }
];

export const threadDetailPost: Post = dummyHomePosts[1];

export const dummyThreadComments: ThreadComment[] = [
    {
        id: 'comment-101',
        postId: 'post-002',
        userId: dummyUser2.id,
        parentPostId: null,
        comment: 'Wah mantap Inno, kebetulan lagi nyari referensi buat implementasi dark mode juga. Boleh share repo-nya nggak?',
        createdAt: '15 Mei 2026',
        votes: 15,
        user: dummyUser2,
        userVoteStatus: true,
        replies: [
            {
                id: 'comment-101-reply-1',
                postId: 'post-002',
                userId: dummyUser1.id,
                parentPostId: 'comment-101',
                comment: 'Siapp Mifey, nanti aku push ke GitHub ya. Kodenya kubuat serapih mungkin biar gampang dibaca.',
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
        userId: 'user-003', 
        parentPostId: null,
        comment: 'Info yang sangat daging! Makasih sharingnya bro.',
        createdAt: '15 Mei 2026',
        votes: 8,
        user: {
            id: 'user-003',
            email: 'student3@student.ciputra.ac.id',
            isStudent: true,
            nim: '20230003',
            name: 'Andi'
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
        isRead: true
    },
    {
        id: 'notif-002',
        actorName: 'Andi',
        actionType: 'reply_comment',
        targetSnippet: 'Wah mantap Han, kebetulan lagi nyari referensi...',
        createdAt: '1 jam yang lalu',
        isRead: true
    },
    {
        id: 'notif-003',
        actorName: 'Anonymous',
        actionType: 'vote',
        targetSnippet: 'Info jadwal pengisian KRS semester ganjil...',
        createdAt: 'Kemarin',
        isRead: true
    },
    {
        id: 'notif-004',
        actorName: 'Budi',
        actionType: 'reply_post',
        targetSnippet: 'Review dosen matkul Machine Learning...',
        createdAt: '2 hari yang lalu',
        isRead: true
    }
];