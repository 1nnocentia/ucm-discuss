package com.example.ucm_discuss_be.notifications;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonPropertyOrder({
    "id",
    "is_read",
    "comment_id",
    "thread_title",
    "thread_id",
    "message",
    "created_at"
})
public class NotificationResponseDto {
    private Long id;
    private Boolean is_read;
    private Long comment_id;
    private String thread_title;
    private Long thread_id;
    private String message;
    private LocalDateTime created_at;
}