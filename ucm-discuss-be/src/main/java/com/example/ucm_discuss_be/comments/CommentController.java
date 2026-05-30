package com.example.ucm_discuss_be.comments;

import com.example.ucm_discuss_be.cloudinary.CloudinaryUploadService;
import com.example.ucm_discuss_be.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

// import javax.print.attribute.standard.Media;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CloudinaryUploadService uploadService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CommentResponseDto>> createComment(
            @Valid @ModelAttribute CommentCreationDto request,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        if (file !=null && !file.isEmpty()) {
            String imageUrl = uploadService.uploadImage(file);
            request.setImage(imageUrl);
        }
                
        CommentModel created = commentService.saveComment(request);
        CommentResponseDto response = commentService.convertToResponse(created);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Comment created"));
    }

    // @PostMapping
    // public ResponseEntity<ApiResponse<CommentResponseDto>> createComment(
    //         @Valid @RequestBody CommentCreationDto request) {
    //     CommentModel created = commentService.saveComment(request);
    //     CommentResponseDto response = commentService.convertToResponse(created);
    //     return ResponseEntity.status(HttpStatus.CREATED)
    //             .body(ApiResponse.success(response, "Comment created"));
    // }

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
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        CommentResponseDto response = commentService.upvoteComment(commentId, email);
        return ResponseEntity.ok(ApiResponse.success(response, "Vote toggled"));
    }

    @DeleteMapping("/{commentId}/vote")
    public ResponseEntity<ApiResponse<CommentResponseDto>> removeVote(
            @PathVariable Long commentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        CommentResponseDto response = commentService.removeVote(commentId, email);
        return ResponseEntity.ok(ApiResponse.success(response, "Vote removed"));
    }

    @GetMapping("/{commentId}/vote-count")
    public ResponseEntity<ApiResponse<Integer>> getVoteCount(
            @PathVariable Long commentId) {
        int count = commentService.getVoteCount(commentId);
        return ResponseEntity.ok(ApiResponse.success(count, "Vote count retrieved"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<CommentResponseDto>>> getMyComments(
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        List<CommentResponseDto> comments = commentService.getMyComments(email);
        return ResponseEntity.ok(ApiResponse.success(comments, "My comments retrieved"));
    }

    // NEW for Card 10
    @GetMapping("/{commentId}/has-voted")
    public ResponseEntity<ApiResponse<Boolean>> hasVoted(
            @PathVariable Long commentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        boolean voted = commentService.hasVoted(commentId, email);
        return ResponseEntity.ok(ApiResponse.success(voted, "Vote status retrieved"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@commentService.isOwner(#id, authentication.name)")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Comment deleted"));
    }
}