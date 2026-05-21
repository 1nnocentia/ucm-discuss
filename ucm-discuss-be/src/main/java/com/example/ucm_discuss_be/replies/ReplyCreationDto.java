package com.example.ucm_discuss_be.replies;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyCreationDto {

    @NotBlank(message = "Reply content is required")
    @Size(min = 1, max = 5000)
    private String content;

    private Boolean is_anon = false;

    @NotNull(message = "Parent comment ID is required")
    private Long parentCommentId;

    @NotNull(message = "User ID is required")
    private Long userId;
}