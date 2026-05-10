package com.example.ucm_discuss_be.courses;

// import java.math.BigInteger;
// import java.security.Timestamp;
// import java.sql.Time;
// import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

// import org.hibernate.annotations.ManyToAny;

import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.users.UserModel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "courses")

public class CourseModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String course_code;
    private String course_name;
    private String year;

    @OneToMany(mappedBy = "course")
    private List<ThreadModel> threads; // One course can have many threads

    @ManyToMany(mappedBy = "courses")
    private List<UserModel> users; // One course can be followed by many users  
}
