package com.example.ucm_discuss_be.replies;

import com.example.ucm_discuss_be.comments.CommentModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "replies")
public class ReplyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * The actual reply comment
     * Example:
     * Parent Comment -> "How do I fix this?"
     * Reply Comment  -> "Try restarting the server."
     */
    @NotNull(message = "Reply comment is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "source_comment_id",
        nullable = false,
        unique = true
    )
    private CommentModel reply_comment;

    /*
     * The parent/original comment being replied to
     */
    @NotNull(message = "Parent comment is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "parent_comment_id",
        nullable = false
    )
    private CommentModel parent_comment;
}