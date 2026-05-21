package com.example.ucm_discuss_be.threads;

import com.example.ucm_discuss_be.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/threads/thread")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @GetMapping
    public Page<ThreadResponseDto> getAllThreads(
            @RequestParam(required = false) Long courseId,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return threadService.getAllThreads(Optional.ofNullable(courseId), pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThreadResponseDto> getThreadById(@PathVariable Long id) {
        return threadService.getThreadById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{id}")
    public Page<ThreadResponseDto> getThreadsByUserId(@PathVariable Long id, 
        @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return threadService.getThreadsByUserId(id, pageable);
    }

    // NEW for Card 11
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<ThreadResponseDto>>> getMyThreads(
            @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = jwt.getClaimAsString("email");
        List<ThreadResponseDto> threads = threadService.getMyThreads(email);
        return ResponseEntity.ok(ApiResponse.success(threads, "My threads retrieved"));
    }

    @GetMapping("/search")
    public Page<ThreadResponseDto> searchThreads(
            @RequestParam String q,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return threadService.searchThreads(q, pageable);
    }

    @PostMapping
    public ResponseEntity<ThreadResponseDto> createThread(@Valid @RequestBody ThreadCreationDto request) {
        ThreadModel createdThread = threadService.saveThread(request);
        ThreadResponseDto response = threadService.convertToResponse(createdThread);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<ApiResponse<Void>> recordView(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {
        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = jwt.getClaimAsString("email");
        threadService.recordView(id, email);
        return ResponseEntity.ok(ApiResponse.success(null, "Thread view recorded"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@threadService.isOwner(#id, authentication.name)")
    public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
        threadService.deleteThread(id);
        return ResponseEntity.noContent().build();
    }
}