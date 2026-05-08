package com.example.ucm_discuss_be.faculties;
import java.math.BigInteger;
// import java.security.Timestamp;
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

public class FacultyModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private String name;
}
