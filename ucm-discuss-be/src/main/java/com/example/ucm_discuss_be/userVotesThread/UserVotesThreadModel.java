package com.example.ucm_discuss_be.userVotesThread;

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
public class UserVotesThreadModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private BigInteger user_id; //Foreign key to users table
    private BigInteger thread_id; //Foreign key to threads table
    private Timestamp created_at;
}
