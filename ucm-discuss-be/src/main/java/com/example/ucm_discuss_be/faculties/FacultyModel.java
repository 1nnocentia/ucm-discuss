package com.example.ucm_discuss_be.faculties;

import java.util.List;

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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity
@Table(
    name = "faculties",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
    }
)
public class FacultyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Faculty name is required")
    @Size(
        min = 2,
        max = 255,
        message = "Faculty name must be between 2 and 255 characters"
    )
    @Column(
        name = "name",
        nullable = false,
        unique = true,
        length = 255
    )
    private String name;

    @OneToMany(
        mappedBy = "faculty",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private List<UserModel> users;
}