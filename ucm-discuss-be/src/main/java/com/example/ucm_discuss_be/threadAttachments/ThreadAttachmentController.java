package com.example.ucm_discuss_be.threadAttachments;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/threads/attachments")
public class ThreadAttachmentController {

    @Autowired
    private ThreadAttachmentService attachmentService;

    @GetMapping
    public List<ThreadAttachmentResponseDto> getAllAttachments() {
        return attachmentService.getAllAttachments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThreadAttachmentResponseDto> getAttachmentById(@PathVariable Long id) {
        return attachmentService.getAttachmentById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ThreadAttachmentResponseDto> createAttachment(@Valid @RequestBody ThreadAttachmentCreationDto request) {
        ThreadAttachmentModel createdAttachment = attachmentService.saveAttachment(request);
        ThreadAttachmentResponseDto response = attachmentService.convertToResponse(createdAttachment);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttachment(@PathVariable Long id) {
        attachmentService.deleteAttachment(id);
        return ResponseEntity.noContent().build();
    }
}