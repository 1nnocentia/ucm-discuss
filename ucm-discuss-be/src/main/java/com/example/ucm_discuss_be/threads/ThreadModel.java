package com.example.ucm_discuss_be.threads;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.threadAttachments.ThreadAttachmentModel;
import com.example.ucm_discuss_be.userVotesThread.UserVotesThreadModel;
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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(name = "threads")
public class ThreadModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Thread title is required")
    @Size(
        min = 3,
        max = 255,
        message = "Thread title must be between 3 and 255 characters"
    )
    @Column(
        name = "title",
        nullable = false,
        length = 255
    )
    private String title;

    @NotBlank(message = "Thread content is required")
    @Size(
        min = 1,
        max = 10000,
        message = "Thread content must be between 1 and 10000 characters"
    )
    @Column(
        name = "content",
        nullable = false,
        length = 10000
    )
    private String content;

    @Min(
        value = 0,
        message = "Vote count cannot be negative"
    )
    @Column(
        name = "vote_count",
        nullable = false
    )
    private int vote_count = 0;

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

    @NotNull(message = "Course is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "course_id",
        nullable = false
    )
    private CourseModel course;

    @OneToMany(
        mappedBy = "thread",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<CommentModel> comments;

    @OneToMany(
        mappedBy = "thread",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<UserVotesThreadModel> user_votes_threads;

    @OneToOne(
        mappedBy = "thread",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private ThreadAttachmentModel thread_attachment;

    @ManyToMany(
        mappedBy = "viewed_threads",
        fetch = FetchType.LAZY
    )
    private List<UserModel> viewers;

    @CreationTimestamp
    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime created_at;
}