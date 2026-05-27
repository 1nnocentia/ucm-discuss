package com.example.ucm_discuss_be.threads;

import com.example.ucm_discuss_be.courses.CourseResponseDto;
import com.example.ucm_discuss_be.users.UserResponseDto;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@JsonPropertyOrder({
    "id",
    "title",
    "content",
    "vote_count",
    "is_anon",
    "image",
    "createdAt",
    "user",
    "course"
})
public class ThreadResponseDto {
    private Long id;
    private String title;
    private String content;
    private int vote_count;
    private Boolean is_anon;
    private String image;
    private LocalDateTime createdAt;
    private UserResponseDto user;
    private CourseResponseDto course;
    // We can add attachments here later
}