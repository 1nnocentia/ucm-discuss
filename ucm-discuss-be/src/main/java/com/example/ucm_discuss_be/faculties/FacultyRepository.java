package com.example.ucm_discuss_be.faculties;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// import com.example.ucm_discuss_be.majors.MajorModel;

@Repository
public interface FacultyRepository extends JpaRepository<FacultyModel, Long> {
    // JpaRepository provides basic CRUD operations for FacultyModel
}
