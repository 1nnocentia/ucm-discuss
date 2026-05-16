package com.example.ucm_discuss_be.faculties;

// import com.example.ucm_discuss_be.faculties.FacultyModel;
// import com.example.ucm_discuss_be.faculties.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public List<FacultyModel> getAllFaculties() {
        return facultyRepository.findAll();
    }

    public Optional<FacultyModel> getFacultyById(Long id) {
        return facultyRepository.findById(id);
    }

    public FacultyModel saveFaculty(FacultyModel faculty) {
        return facultyRepository.save(faculty);
    }

    public FacultyModel updateFaculty(Long id, FacultyModel facultyDetails) {
        FacultyModel faculty = facultyRepository.findById(id).orElseThrow(() -> new RuntimeException("Faculty not found"));
        faculty.setName(facultyDetails.getName());
        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }
}
