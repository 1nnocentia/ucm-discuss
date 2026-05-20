package com.example.ucm_discuss_be.comments;

import com.example.ucm_discuss_be.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public CommentModel saveComment(CommentCreationDto dto) {
        throw new UnsupportedOperationException("Implement comment creation logic");
    }

    @Transactional
    public void deleteComment(Long id) {
        CommentModel comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", id));
        commentRepository.delete(comment);
    }

    public boolean isOwner(Long commentId, String email) {
        return commentRepository.findById(commentId)
                .map(comment -> comment.getUser() != null 
                    && email.equals(comment.getUser().getEmail()))
                .orElse(false);
    }
}