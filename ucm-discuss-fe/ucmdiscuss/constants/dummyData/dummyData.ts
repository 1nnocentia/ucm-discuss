import { UserHistory, ProfileCardData, Topics } from '@/models/user';


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

export const TopicsDummyData : Topics[] = [
    { id: '1', name: 'Software Engineering' },
    { id: '2', name: 'Artificial Intelligence' },
    { id: '3', name: 'Information Management' },
    { id: '4', name: 'Computer Networks' },
]