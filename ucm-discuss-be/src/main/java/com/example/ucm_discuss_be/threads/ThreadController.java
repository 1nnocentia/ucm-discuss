package com.example.ucm_discuss_be.threads;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/threads/thread")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @GetMapping
    public List<ThreadResponseDto> getAllThreads(@RequestParam(required = false) Long courseId) {
        return threadService.getAllThreads(Optional.ofNullable(courseId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThreadResponseDto> getThreadById(@PathVariable Long id) {
        return threadService.getThreadById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
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