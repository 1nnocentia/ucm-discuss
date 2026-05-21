package com.example.ucm_discuss_be.comments;

import com.example.ucm_discuss_be.users.UserResponseDto;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonPropertyOrder({
    "id", "content", "vote_count", "asked_ai", "is_anon",
    "created_at", "user", "file_url", "file_type"
})
public class CommentResponseDto {
    private Long id;
    private String content;
    private int vote_count;
    private Boolean asked_ai;
    private Boolean is_anon;
    private LocalDateTime created_at;
    private UserResponseDto user;
    private String file_url;
    private String file_type;
}