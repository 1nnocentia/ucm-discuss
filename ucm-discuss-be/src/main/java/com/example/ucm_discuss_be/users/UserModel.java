package com.example.ucm_discuss_be.users;

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

public class UserModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private String nim_or_nisn;
    private String name;
    private String email;
    private String password;
    private Boolean is_lecturer;
    private BigInteger major_id; //Foreign key to majors table
    private BigInteger faculty_id; //Foreign key to faculties table
    private Timestamp created_at;
}
