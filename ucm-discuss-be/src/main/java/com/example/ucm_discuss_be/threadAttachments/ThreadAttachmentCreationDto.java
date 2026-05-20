package com.example.ucm_discuss_be.threadAttachments;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThreadAttachmentCreationDto {

    @NotBlank(message = "File URL is required")
    @Size(min = 1, max = 1000)
    private String file_url;

    @NotBlank(message = "File type is required")
    @Size(min = 1, max = 100)
    private String file_type;

    @NotNull(message = "Thread ID is required")
    private Long threadId;
}