package com.example.ucm_discuss_be.threadAttachments;

import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ThreadAttachmentService {

    @Autowired
    private ThreadAttachmentRepository attachmentRepository;
    @Autowired
    private ThreadRepository threadRepository;

    @Transactional(readOnly = true)
    public List<ThreadAttachmentResponseDto> getAllAttachments() {
        return attachmentRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ThreadAttachmentResponseDto> getAttachmentById(Long id) {
        return attachmentRepository.findById(id).map(this::convertToResponse);
    }

    @Transactional
    public ThreadAttachmentModel saveAttachment(ThreadAttachmentCreationDto dto) {
        ThreadModel thread = threadRepository.findById(dto.getThreadId())
                .orElseThrow(() -> new RuntimeException("Thread not found with id: " + dto.getThreadId()));

        ThreadAttachmentModel attachment = new ThreadAttachmentModel();
        attachment.setFile_url(dto.getFile_url());
        attachment.setFile_type(dto.getFile_type());
        attachment.setThread(thread);

        return attachmentRepository.save(attachment);
    }

    @Transactional
    public void deleteAttachment(Long id) {
        if (!attachmentRepository.existsById(id)) {
            throw new RuntimeException("Attachment not found with id: " + id);
        }
        attachmentRepository.deleteById(id);
    }

    public ThreadAttachmentResponseDto convertToResponse(ThreadAttachmentModel attachment) {
        ThreadAttachmentResponseDto dto = new ThreadAttachmentResponseDto();
        dto.setId(attachment.getId());
        dto.setFile_url(attachment.getFile_url());
        dto.setFile_type(attachment.getFile_type());
        dto.setCreated_at(attachment.getCreated_at());

        if (attachment.getThread() != null) {
            dto.setThreadId(attachment.getThread().getId());
        }

        return dto;
    }
}