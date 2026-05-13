package com.example.ucm_discuss_be.commentAttachments;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.comments.CommentModel;

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

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(
    name = "comment_attachments",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "comment_id")
    }
)
public class CommentAttachmentModel {

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

    @NotNull(message = "Comment is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "comment_id",
        nullable = false,
        unique = true
    )
    private CommentModel comment;

    @CreationTimestamp
    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime created_at;
}