package com.example.ucm_discuss_be.replies;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.comments.CommentRepository;
import com.example.ucm_discuss_be.exceptions.ResourceNotFoundException;
import com.example.ucm_discuss_be.notifications.NotificationService;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Transactional
    public ReplyModel saveReply(ReplyCreationDto dto) {
        UserModel user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", dto.getUserId()));

        CommentModel parentComment = commentRepository.findById(dto.getParentCommentId())
                .orElseThrow(() -> new ResourceNotFoundException("Comment", dto.getParentCommentId()));

        // Create the reply as a new comment
        CommentModel replyComment = new CommentModel();
        replyComment.setContent(dto.getContent());
        replyComment.setIs_anon(dto.getIs_anon() != null ? dto.getIs_anon() : false);
        replyComment.setAsked_ai(false);
        replyComment.setVote_count(0);
        replyComment.setUser(user);
        replyComment.setThread(parentComment.getThread());

        CommentModel savedReplyComment = commentRepository.save(replyComment);

        // Link reply to parent
        ReplyModel reply = new ReplyModel();
        reply.setReply_comment(savedReplyComment);
        reply.setParent_comment(parentComment);

        ReplyModel savedReply = replyRepository.save(reply);

        // Notify parent comment owner (if not replying to self)
        if (!parentComment.getUser().getId().equals(user.getId())) {
            notificationService.createNotification(parentComment.getUser(), savedReplyComment);
        }

        return savedReply;
    }

    @Transactional(readOnly = true)
    public List<ReplyResponseDto> getRepliesByParentCommentId(Long parentCommentId) {
        return replyRepository.findByParentCommentId(parentCommentId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReplyResponseDto getReplyByCommentId(Long commentId) {
        ReplyModel reply = replyRepository.findByReplyCommentId(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Reply", commentId));
        return convertToResponse(reply);
    }

    @Transactional
    public void deleteReply(Long id) {
        ReplyModel reply = replyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reply", id));
        replyRepository.delete(reply);
    }

    public ReplyResponseDto convertToResponse(ReplyModel reply) {
        ReplyResponseDto dto = new ReplyResponseDto();
        dto.setId(reply.getId());

        if (reply.getReply_comment() != null) {
            CommentModel rc = reply.getReply_comment();
            dto.setContent(rc.getContent());
            dto.setIs_anon(rc.getIs_anon());
            dto.setCreated_at(rc.getCreated_at());
            if (rc.getUser() != null) {
                dto.setUser(userService.convertToResponse(rc.getUser()));
            }
        }

        if (reply.getParent_comment() != null) {
            dto.setParent_comment_id(reply.getParent_comment().getId());
        }

        return dto;
    }
}