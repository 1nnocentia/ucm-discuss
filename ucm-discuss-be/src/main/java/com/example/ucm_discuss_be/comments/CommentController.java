package com.example.ucm_discuss_be.comments;

import com.example.ucm_discuss_be.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<ApiResponse<CommentModel>> createComment(
            @Valid @RequestBody CommentCreationDto request) {
        CommentModel created = commentService.saveComment(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(created, "Comment created"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@commentService.isOwner(#id, authentication.name)")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Comment deleted"));
    }
}