package com.example.ucm_discuss_be.comments;

import com.example.ucm_discuss_be.users.UserResponseDto;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonPropertyOrder({
    "id", "content", "vote_count", "asked_ai", "is_anon", "image", 
    "created_at", "user"
})
public class CommentResponseDto {
    private Long id;
    private String content;
    private int vote_count;
    private String image;
    private Boolean asked_ai;
    private String ai_question;
    private Boolean is_anon;
    private LocalDateTime created_at;
    private UserResponseDto user;
}