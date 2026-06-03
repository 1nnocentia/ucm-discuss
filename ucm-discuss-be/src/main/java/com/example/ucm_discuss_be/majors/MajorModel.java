package com.example.ucm_discuss_be.majors;

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
    name = "majors",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
    }
)
public class MajorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Major name is required")
    @Size(
        min = 1,
        max = 10,
        message = "Major name must be between 1 and 10 characters"
    )
    @Column(
        name = "name",
        nullable = false,
        unique = true,
        length = 10
    )
    private String name;

    @OneToMany(
        mappedBy = "major",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private List<UserModel> users;
}