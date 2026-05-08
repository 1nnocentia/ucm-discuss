package com.example.ucm_discuss_be.threads;

import java.math.BigInteger;
import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

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
public class ThreadModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private BigInteger user_id; //Foreign key to users table
    private BigInteger course_id; //Foreign key to courses table
    private String title;
    private String content;
    private int vote_count; // I believe there's an easier way to count using a seperate table to track users' votes we have created. But I don't know how to utilise it optimally on Spring Boot yet. Since this should be easy
    private boolean is_anon;
    private Timestamp created_at;
}
