package com.example.ucm_discuss_be.comments;

import com.example.ucm_discuss_be.commentAttachments.CommentAttachmentModel;
import com.example.ucm_discuss_be.exceptions.ResourceNotFoundException;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.example.ucm_discuss_be.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

        if (dto.getFileUrl() != null && !dto.getFileUrl().isBlank()) {
            CommentAttachmentModel attachment = new CommentAttachmentModel();
            attachment.setFile_url(dto.getFileUrl());
            attachment.setFile_type(dto.getFileType() != null ? dto.getFileType() : "image");
            attachment.setComment(comment);
            comment.setComment_attachment(attachment);
        }

        return commentRepository.save(comment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByThreadId(Long threadId) {
        return commentRepository.findByThreadId(threadId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
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

        if (comment.getUser() != null) {
            dto.setUser(userService.convertToResponse(comment.getUser()));
        }

        if (comment.getComment_attachment() != null) {
            dto.setFile_url(comment.getComment_attachment().getFile_url());
            dto.setFile_type(comment.getComment_attachment().getFile_type());
        }

        return dto;
    }
}