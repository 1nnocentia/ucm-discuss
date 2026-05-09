package com.example.ucm_discuss_be.comments;

import java.time.LocalDateTime;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity

public class CommentModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long thread_id; //Foreign key to threads table
    private Long user_id; //Foreign key to users table
    private String content;
    private int vote_count;
    private Boolean asked_ai;
    private Boolean is_anon;

    @CreationTimestamp
    private LocalDateTime created_at;
}
