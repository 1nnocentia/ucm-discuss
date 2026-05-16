package com.example.ucm_discuss_be.threadAttachments;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.threads.ThreadModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(
    name = "thread_attachments",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "thread_id")
    }
)
public class ThreadAttachmentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "File URL is required")
    @Size(
        min = 1,
        max = 1000,
        message = "File URL must be between 1 and 1000 characters"
    )
    @Column(
        name = "file_url",
        nullable = false,
        length = 1000
    )
    private String file_url;

    @NotBlank(message = "File type is required")
    @Size(
        min = 1,
        max = 100,
        message = "File type must be between 1 and 100 characters"
    )
    @Column(
        name = "file_type",
        nullable = false,
        length = 100
    )
    private String file_type;

    @NotNull(message = "Thread is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "thread_id",
        nullable = false,
        unique = true
    )
    private ThreadModel thread;

    @CreationTimestamp
    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime created_at;
}