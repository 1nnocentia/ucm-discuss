package com.example.ucm_discuss_be.comments;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentCreationDto {

    @NotBlank(message = "Content is required")
    @Size(min = 1, max = 5000)
    private String content;

    private Boolean is_anon = false;

    @NotNull(message = "Thread ID is required")
    private Long threadId;

    @NotNull(message = "User ID is required")
    private Long userId;
}