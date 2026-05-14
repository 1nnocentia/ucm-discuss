import { UserHistory, ProfileCardData, Topics, TopicsData } from '@/models/user';


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
    major: "Artificial Intelligence",
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