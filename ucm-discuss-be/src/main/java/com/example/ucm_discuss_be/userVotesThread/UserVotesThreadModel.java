package com.example.ucm_discuss_be.userVotesThread;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.users.UserModel;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import jakarta.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(
    name = "user_votes_thread",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "thread_id"})
    }
)
public class UserVotesThreadModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @CreationTimestamp
    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime created_at;
}