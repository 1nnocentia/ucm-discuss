package com.example.ucm_discuss_be.notifications;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.comments.CommentModel;
import com.example.ucm_discuss_be.users.UserModel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "notifications")

public class NotificationModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Long user_id; //Foreign key to users table
    // private Long comment_id; //Foreign key to comments table
    private Boolean is_read;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user; // Many notifications can reference one user

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private CommentModel comment; // Many notifications can reference one comment

    @CreationTimestamp
    private LocalDateTime created_at;
}
