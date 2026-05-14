package com.example.ucm_discuss_be.userVotesThread;

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

import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.users.UserModel;

import jakarta.persistence.CascadeType;
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
@Table(name = "user_votes_thread")

public class UserVotesThreadModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // private Long user_id; //Foreign key to users table
    // private Long thread_id; //Foreign key to threads table

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserModel user; // Many votes belong to one user

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "thread_id")
    private ThreadModel thread; // Many votes belong to one thread
    
    @CreationTimestamp
    private LocalDateTime created_at;
}
