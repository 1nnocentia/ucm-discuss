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
    public ResponseEntity<ApiResponse<CommentResponseDto>> createComment(
            @Valid @RequestBody CommentCreationDto request) {
        CommentModel created = commentService.saveComment(request);
        CommentResponseDto response = commentService.convertToResponse(created);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Comment created"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@commentService.isOwner(#id, authentication.name)")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Comment deleted"));
    }
}