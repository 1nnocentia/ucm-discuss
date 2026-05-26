package com.example.ucm_discuss_be.replies;

import com.example.ucm_discuss_be.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/replies")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @PostMapping
    public ResponseEntity<ApiResponse<ReplyResponseDto>> createReply(
            @Valid @RequestBody ReplyCreationDto request) {
        ReplyModel created = replyService.saveReply(request);
        ReplyResponseDto response = replyService.convertToResponse(created);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Reply created"));
    }

    @GetMapping("/comment/{parentCommentId}")
    public ResponseEntity<ApiResponse<List<ReplyResponseDto>>> getRepliesByParentComment(
            @PathVariable Long parentCommentId) {
        List<ReplyResponseDto> replies = replyService.getRepliesByParentCommentId(parentCommentId);
        return ResponseEntity.ok(ApiResponse.success(replies, "Replies retrieved"));
    }

    @GetMapping("/by-comment/{commentId}")
    public ResponseEntity<ApiResponse<ReplyResponseDto>> getReplyByCommentId(
            @PathVariable Long commentId) {
        ReplyResponseDto response = replyService.getReplyByCommentId(commentId);
        return ResponseEntity.ok(ApiResponse.success(response, "Reply retrieved"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReply(@PathVariable Long id) {
        replyService.deleteReply(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Reply deleted"));
    }
}