package com.example.ucm_discuss_be.courses;

import java.util.List;

import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.users.UserModel;

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
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(
    name = "courses",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "course_code")
    }
)
public class CourseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Course code is required")
    @Size(
        min = 2,
        max = 20,
        message = "Course code must be between 2 and 20 characters"
    )
    @Column(
        name = "course_code",
        nullable = false,
        unique = true,
        length = 20
    )
    private String course_code;

    @NotBlank(message = "Course name is required")
    @Size(
        min = 2,
        max = 255,
        message = "Course name must be between 2 and 255 characters"
    )
    @Column(
        name = "course_name",
        nullable = false,
        length = 255
    )
    private String course_name;

    @NotBlank(message = "Year is required")
    @Pattern(
        regexp = "^[0-9]{4}$",
        message = "Year must be a valid 4-digit year"
    )
    @Column(
        name = "year",
        nullable = false,
        length = 4
    )
    private String year;

    @OneToMany(
        mappedBy = "course",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ThreadModel> threads;

    @ManyToMany(
        mappedBy = "courses",
        fetch = FetchType.LAZY
    )
    private List<UserModel> users;
}