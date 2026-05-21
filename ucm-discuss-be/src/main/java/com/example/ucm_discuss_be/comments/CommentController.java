package com.example.ucm_discuss_be.comments;

import com.example.ucm_discuss_be.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/thread/{threadId}")
    public ResponseEntity<ApiResponse<List<CommentResponseDto>>> getCommentsByThread(
            @PathVariable Long threadId) {
        List<CommentResponseDto> comments = commentService.getCommentsByThreadId(threadId);
        return ResponseEntity.ok(ApiResponse.success(comments, "Comments retrieved"));
    }

    @GetMapping("/thread/{threadId}/by-upvote")
    public ResponseEntity<ApiResponse<List<CommentResponseDto>>> getCommentsByThreadOrderedByUpvote(
            @PathVariable Long threadId) {
        List<CommentResponseDto> comments = commentService.getCommentsByThreadIdOrderedByUpvote(threadId);
        return ResponseEntity.ok(ApiResponse.success(comments, "Comments ordered by upvote count"));
    }

    @PostMapping("/{commentId}/upvote")
    public ResponseEntity<ApiResponse<CommentResponseDto>> upvoteComment(
            @PathVariable Long commentId,
            @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = jwt.getClaimAsString("email");
        CommentResponseDto response = commentService.upvoteComment(commentId, email);
        return ResponseEntity.ok(ApiResponse.success(response, "Vote toggled"));
    }

    @DeleteMapping("/{commentId}/vote")
    public ResponseEntity<ApiResponse<CommentResponseDto>> removeVote(
            @PathVariable Long commentId,
            @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = jwt.getClaimAsString("email");
        CommentResponseDto response = commentService.removeVote(commentId, email);
        return ResponseEntity.ok(ApiResponse.success(response, "Vote removed"));
    }

    // NEW for Card 6
    @GetMapping("/{commentId}/vote-count")
    public ResponseEntity<ApiResponse<Integer>> getVoteCount(
            @PathVariable Long commentId) {
        int count = commentService.getVoteCount(commentId);
        return ResponseEntity.ok(ApiResponse.success(count, "Vote count retrieved"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@commentService.isOwner(#id, authentication.name)")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Comment deleted"));
    }
}