package com.example.ucm_discuss_be.threads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThreadCreationDto {

    @NotBlank(message = "Thread title is required")
    @Size(min = 3, max = 255)
    private String title;

    // @NotBlank(message = "Thread content is required")
    @Size(min = 1, max = 10000)
    private String content;

    private Boolean is_anon = false;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    // Optional: attach 1 image when creating a thread
    @Size(max = 1000, message = "Image URL must be at most 1000 characters")
    private String image;
}