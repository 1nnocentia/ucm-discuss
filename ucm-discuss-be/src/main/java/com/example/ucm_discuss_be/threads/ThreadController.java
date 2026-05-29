package com.example.ucm_discuss_be.threads;

import com.example.ucm_discuss_be.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import com.example.ucm_discuss_be.cloudinary.CloudinaryUploadService;
import org.springframework.http.MediaType;
// import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
// import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/threads/thread")
@RequiredArgsConstructor
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @Autowired
    private CloudinaryUploadService uploadService;

   
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

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<ThreadResponseDto>>> getMyThreads(
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        List<ThreadResponseDto> threads = threadService.getMyThreads(email);
        return ResponseEntity.ok(ApiResponse.success(threads, "My threads retrieved"));
    }

    @GetMapping("/search")
    public Page<ThreadResponseDto> searchThreads(
            @RequestParam String q,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return threadService.searchThreads(q, pageable);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ThreadResponseDto>> createThread(
            @Valid @ModelAttribute ThreadCreationDto request,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        // Check if the request has a file (Exactly like Laravel's $request->hasFile('images'))
        if (file != null && !file.isEmpty()) {
            // Call the upload service
            String imageUrl = uploadService.uploadImage(file);
            // Set the result URL into your DTO before saving
            request.setImage(imageUrl); 
        }

        // Save the thread (your service doesn't need to change, it just maps dto.getImage() to the entity)
        ThreadModel createdThread = threadService.saveThread(request);
        ThreadResponseDto response = threadService.convertToResponse(createdThread);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "Thread created successfully"));
    }

    // @PostMapping
    // public ResponseEntity<ThreadResponseDto> createThread(@Valid @RequestBody ThreadCreationDto request) {
    //     ThreadModel createdThread = threadService.saveThread(request);
    //     ThreadResponseDto response = threadService.convertToResponse(createdThread);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(response);
    // }

    // NEW for Card 14
    @PostMapping("/{id}/upvote")
    public ResponseEntity<ApiResponse<ThreadResponseDto>> upvoteThread(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        ThreadResponseDto response = threadService.upvoteThread(id, email);
        return ResponseEntity.ok(ApiResponse.success(response, "Thread vote toggled"));
    }

    @DeleteMapping("/{id}/vote")
    public ResponseEntity<ApiResponse<ThreadResponseDto>> removeVote(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        ThreadResponseDto response = threadService.removeVote(id, email);
        return ResponseEntity.ok(ApiResponse.success(response, "Thread vote removed"));
    }

    // NEW for Card 14
    @GetMapping("/{id}/vote-count")
    public ResponseEntity<ApiResponse<Integer>> getVoteCount(
            @PathVariable Long id) {
        int count = threadService.getVoteCount(id);
        return ResponseEntity.ok(ApiResponse.success(count, "Thread vote count retrieved"));
    }

    // NEW for Card 14
    @GetMapping("/{id}/has-voted")
    public ResponseEntity<ApiResponse<Boolean>> hasVoted(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
        boolean voted = threadService.hasVoted(id, email);
        return ResponseEntity.ok(ApiResponse.success(voted, "Thread vote status retrieved"));
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<ApiResponse<Void>> recordView(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = userDetails.getUsername();
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