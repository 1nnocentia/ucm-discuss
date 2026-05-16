package com.example.ucm_discuss_be.majors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// import com.example.ucm_discuss_be.majors.MajorModel;

@Repository
public interface MajorRepository extends JpaRepository<MajorModel, Long> {
    // JpaRepository provides basic CRUD operations for MajorModel
}
