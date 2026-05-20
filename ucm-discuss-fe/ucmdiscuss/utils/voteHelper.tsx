import { ThreadComment } from "@/models/user";


export const findAndMutateCommentVote = (
    comments: ThreadComment[],
    commentId: string,
    isVoted: boolean
): boolean => {
    for (let comment of comments) {
        if (comment.id === commentId) {
            comment.userVoteStatus = isVoted;
            comment.votes = isVoted ? comment.votes + 1 : Math.max(0, comment.votes - 1);
            return true;
        }
        if (comment.replies && comment.replies.length > 0) {
            const found = findAndMutateCommentVote(comment.replies, commentId, isVoted);
            if (found) return true;
        }
    }
    return false;
};