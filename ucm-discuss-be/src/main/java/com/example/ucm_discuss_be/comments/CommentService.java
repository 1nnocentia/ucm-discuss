package com.example.ucm_discuss_be.comments;

// import com.example.ucm_discuss_be.commentAttachments.CommentAttachmentModel;
import com.example.ucm_discuss_be.exceptions.BusinessException;
import com.example.ucm_discuss_be.exceptions.ResourceNotFoundException;
import com.example.ucm_discuss_be.notifications.NotificationService;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadRepository;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentModel;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThreadRepository threadRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserVotesCommentRepository userVotesCommentRepository;

    @Autowired
    private NotificationService notificationService;

    @Transactional
    public CommentModel saveComment(CommentCreationDto dto) {
        UserModel user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", dto.getUserId()));

        ThreadModel thread = threadRepository.findById(dto.getThreadId())
                .orElseThrow(() -> new ResourceNotFoundException("Thread", dto.getThreadId()));

        CommentModel comment = new CommentModel();
        comment.setContent(dto.getContent());
        comment.setIs_anon(dto.getIs_anon() != null ? dto.getIs_anon() : false);
        comment.setAsked_ai(false);
        comment.setVote_count(0);
        comment.setUser(user);
        comment.setThread(thread);
        comment.setImage(dto.getImage());

        // if (dto.getFileUrl() != null && !dto.getFileUrl().isBlank()) {
        //     CommentAttachmentModel attachment = new CommentAttachmentModel();
        //     attachment.setFile_url(dto.getFileUrl());
        //     attachment.setFile_type(dto.getFileType() != null ? dto.getFileType() : "image");
        //     attachment.setComment(comment);
        //     comment.setComment_attachment(attachment);
        // }

        CommentModel saved = commentRepository.save(comment);

        // NEW for Card 12: Create notification if commenting on someone else's thread
        if (!thread.getUser().getId().equals(user.getId())) {
            notificationService.createNotification(thread.getUser(), saved);
        }

        return saved;
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByThreadId(Long threadId) {
        return commentRepository.findByThreadId(threadId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByThreadIdOrderedByUpvote(Long threadId) {
        return commentRepository.findByThreadIdOrderByVoteCountDesc(threadId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentResponseDto upvoteComment(Long commentId, String userEmail) {
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException("User not found for email: " + userEmail, HttpStatus.NOT_FOUND));

        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", commentId));

        Optional<UserVotesCommentModel> existingVote = userVotesCommentRepository
                .findByUserIdAndCommentId(user.getId(), commentId);

        if (existingVote.isPresent()) {
            userVotesCommentRepository.delete(existingVote.get());
            comment.setVote_count(Math.max(0, comment.getVote_count() - 1));
        } else {
            UserVotesCommentModel vote = new UserVotesCommentModel();
            vote.setUser(user);
            vote.setComment(comment);
            userVotesCommentRepository.save(vote);
            comment.setVote_count(comment.getVote_count() + 1);
        }

        CommentModel saved = commentRepository.save(comment);
        return convertToResponse(saved);
    }

    @Transactional
    public CommentResponseDto removeVote(Long commentId, String userEmail) {
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException("User not found for email: " + userEmail, HttpStatus.NOT_FOUND));

        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", commentId));

        UserVotesCommentModel vote = userVotesCommentRepository
                .findByUserIdAndCommentId(user.getId(), commentId)
                .orElseThrow(() -> new BusinessException("Vote not found", HttpStatus.NOT_FOUND));

        userVotesCommentRepository.delete(vote);
        comment.setVote_count(Math.max(0, comment.getVote_count() - 1));

        CommentModel saved = commentRepository.save(comment);
        return convertToResponse(saved);
    }

    @Transactional(readOnly = true)
    public int getVoteCount(Long commentId) {
        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", commentId));
        return comment.getVote_count();
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getMyComments(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("User not found for email: " + email, HttpStatus.NOT_FOUND));
        return commentRepository.findByUserId(user.getId()).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public boolean hasVoted(Long commentId, String userEmail) {
        UserModel user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new BusinessException("User not found for email: " + userEmail, HttpStatus.NOT_FOUND));
        return userVotesCommentRepository.findByUserIdAndCommentId(user.getId(), commentId).isPresent();
    }

    @Transactional
    public void deleteComment(Long id) {
        CommentModel comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", id));
        commentRepository.delete(comment);
    }

    public boolean isOwner(Long commentId, String email) {
        return commentRepository.findByIdWithUser(commentId)
                .map(comment -> comment.getUser() != null
                        && email.equals(comment.getUser().getEmail()))
                .orElse(false);
    }

    public CommentResponseDto convertToResponse(CommentModel comment) {
        CommentResponseDto dto = new CommentResponseDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setVote_count(comment.getVote_count());
        dto.setAsked_ai(comment.getAsked_ai());
        dto.setIs_anon(comment.getIs_anon());
        dto.setCreated_at(comment.getCreated_at());
        dto.setImage(comment.getImage());

        if (comment.getUser() != null) {
            dto.setUser(userService.convertToResponse(comment.getUser()));
        }

        // if (comment.getComment_attachment() != null) {
        //     dto.setFile_url(comment.getComment_attachment().getFile_url());
        //     dto.setFile_type(comment.getComment_attachment().getFile_type());
        // }

        return dto;
    }

    @Transactional(readOnly = true)
    public CommentResponseDto getCommentWithReplies(Long commentId) {
        CommentModel comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", commentId));
        return convertToResponseWithReplies(comment);
    }

    public CommentResponseDto convertToResponseWithReplies(CommentModel comment) {
    CommentResponseDto dto = convertToResponse(comment);
    // Replies are loaded via ReplyController, not embedded here to avoid circular JSON
    return dto;
}
}