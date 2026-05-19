package com.example.ucm_discuss_be.threads;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

// import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/threads/thread")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @GetMapping
    public Page<ThreadResponseDto> getAllThreads(
            @RequestParam(required = false) Long courseId,
            @PageableDefault(size = 10)Pageable pageable
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
    public Page<ThreadResponseDto> getThreadsByUserId(@PathVariable Long id, @PageableDefault(size = 10) Pageable pageable) {
        return threadService.getThreadsByUserId(id, pageable);
    }
    

    @PostMapping
    public ResponseEntity<ThreadResponseDto> createThread(@Valid @RequestBody ThreadCreationDto request) {
        ThreadModel createdThread = threadService.saveThread(request);
        ThreadResponseDto response = threadService.convertToResponse(createdThread);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@threadService.isOwner(#id, authentication.name)")
    public ResponseEntity<Void> deleteThread(@PathVariable Long id) {
        threadService.deleteThread(id);
        return ResponseEntity.noContent().build();
    }
}