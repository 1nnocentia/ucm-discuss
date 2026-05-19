package com.example.ucm_discuss_be.threadAttachments;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonPropertyOrder({
    "id",
    "file_url",
    "file_type",
    "threadId",
    "created_at"
})
public class ThreadAttachmentResponseDto {
    private Long id;
    private String file_url;
    private String file_type;
    private Long threadId;
    private LocalDateTime created_at;
}