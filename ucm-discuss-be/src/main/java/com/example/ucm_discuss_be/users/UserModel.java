package com.example.ucm_discuss_be.users;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.majors.MajorModel;
import com.example.ucm_discuss_be.notifications.NotificationModel;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.userVotesComment.UserVotesCommentModel;
import com.example.ucm_discuss_be.userVotesThread.UserVotesThreadModel;
import com.example.ucm_discuss_be.userViewedThreads.UserViewedThreadModel;

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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "nim_or_nisn")
    }
)
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "NIM or NISN is required")
    @Size(
        min = 5,
        max = 50,
        message = "NIM or NISN must be between 5 and 50 characters"
    )
    @Column(
        name = "nim_or_nisn",
        nullable = false,
        unique = true,
        length = 50
    )
    private String nim_or_nisn;

    @NotBlank(message = "Name is required")
    @Size(
        min = 2,
        max = 255,
        message = "Name must be between 2 and 255 characters"
    )
    @Column(
        name = "name",
        nullable = false,
        length = 255
    )
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    @Size(
        max = 255,
        message = "Email must not exceed 255 characters"
    )
    @Column(
        name = "email",
        nullable = false,
        unique = true,
        length = 255
    )
    private String email;

    @NotBlank(message = "Password is required")
    @Size(
        min = 8,
        max = 255,
        message = "Password must be between 8 and 255 characters"
    )
    @Column(
        name = "password",
        nullable = false,
        length = 255
    )
    private String password;

    @NotNull(message = "Lecturer status is required")
    @Column(
        name = "is_lecturer",
        nullable = false
    )
    private Boolean is_lecturer = false;

    @NotNull(message = "Anonymous status is required")
    @Column(
        name = "is_anon",
        nullable = false
    )
    private Boolean is_anon = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id")
    private MajorModel major;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id")
    private FacultyModel faculty;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<NotificationModel> notifications;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ThreadModel> created_threads;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<CommentModel> comments;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<UserVotesThreadModel> voted_threads;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<UserVotesCommentModel> voted_comments;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_course",
        joinColumns = @JoinColumn(
            name = "user_id",
            referencedColumnName = "id"
        ),
        inverseJoinColumns = @JoinColumn(
            name = "course_id",
            referencedColumnName = "id"
        )
    )
    private List<CourseModel> courses;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<UserViewedThreadModel> viewed_threads;

    @CreationTimestamp
    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime created_at;
}