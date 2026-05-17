package com.example.ucm_discuss_be.faculties;

// import com.example.ucm_discuss_be.faculties.FacultyModel;
// import com.example.ucm_discuss_be.faculties.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// import com.example.ucm_discuss_be.majors.MajorModel;
// import com.example.ucm_discuss_be.majors.MajorResponseDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public List<FacultyResponseDto> getAllFaculties() {
        List<FacultyModel> faculties = facultyRepository.findAll();
        List<FacultyResponseDto> responseList = new ArrayList<>();
        for (FacultyModel faculty : faculties) {
            responseList.add(convertToResponse(faculty));
        }
        return responseList;
    }

    public Optional<FacultyResponseDto> getFacultyById(Long id) {
        Optional<FacultyModel> faculty = facultyRepository.findById(id);
        if (faculty != null && faculty.isPresent()) {
            FacultyResponseDto response = convertToResponse(faculty.get());
            return Optional.of(response);
        }
        return Optional.empty();
    }

    public FacultyModel saveFaculty(FacultyModel faculty) {
        return facultyRepository.save(faculty);
    }

    public FacultyModel updateFaculty(Long id, FacultyModel facultyDetails) {
        FacultyModel faculty = facultyRepository.findById(id).orElseThrow(() -> new RuntimeException("Faculty not found"));
        faculty.setName(facultyDetails.getName());
        return facultyRepository.save(faculty);
    }

    public FacultyResponseDto convertToResponse(FacultyModel faculty) {
        FacultyResponseDto response = new FacultyResponseDto();
        response.setId(faculty.getId());
        response.setName(faculty.getName());
        return response;
    }

    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }
}
