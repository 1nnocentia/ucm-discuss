package com.example.ucm_discuss_be.comments;

import java.time.LocalDateTime;
import java.util.List;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

// import com.example.ucm_discuss_be.commentAttachments.CommentAttachmentModel;
import com.example.ucm_discuss_be.notifications.NotificationModel;
import com.example.ucm_discuss_be.replies.ReplyModel;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentModel;
import com.example.ucm_discuss_be.users.UserModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "comments")

public class CommentModel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Content is required")
    @Size(
        min = 1,
        max = 5000,
        message = "Content must be between 1 and 5000 characters")
    @Column(
        nullable = false,
        length = 5000
    )
    private String content;

    @Size(
        max = 1000,
        message = "Image URL must be at most 1000 characters"
    )
    @Column(
        name = "image",
        nullable = true,
        length = 1000
    )
    private String image;

    @Min(
        value = 0,
        message = "Vote count cannot be negative"
    )
    @Column(
        name = "vote_count",
        nullable = false
    )
    private int vote_count = 0;

    @NotNull(message = "asked_ai status is required")
    @Column(
        name = "asked_ai",
        nullable = false
    )
    private Boolean asked_ai = false;

    @NotNull(message = "Anonymous status is required")
    @Column(
        name = "is_anon",
        nullable = false
    )
    private Boolean is_anon = false;

    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        nullable = false
    )
    private UserModel user;

    @NotNull(message = "Thread is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "thread_id",
        nullable = false
    )
    private ThreadModel thread;

    @OneToMany(
        mappedBy = "comment",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<UserVotesCommentModel> user_votes_comments;

    @OneToMany(
        mappedBy = "comment",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<NotificationModel> notifications;
    

    // @OneToOne(
    //     mappedBy = "comment",
    //     cascade = CascadeType.ALL,
    //     orphanRemoval = true,
    //     fetch = FetchType.LAZY
    // )
    // private CommentAttachmentModel comment_attachment;

    // Reply transient table relationship
    @OneToOne(
        mappedBy = "reply_comment",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private ReplyModel reply_reference;

    @OneToMany(
        mappedBy = "parent_comment",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ReplyModel> replies;

    @CreationTimestamp
    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime created_at;
}
