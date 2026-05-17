package com.example.ucm_discuss_be.faculties;

// import com.example.ucm_discuss_be.faculties.FacultyModel;
// import com.example.ucm_discuss_be.faculties.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
public class FacultyController {
    @Autowired
    private FacultyService facultyService;

    @GetMapping
    // Example: GET /api/faculties
    public List<FacultyResponseDto> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    @GetMapping("/{id}")
    // Example: GET /api/faculties/1
    public ResponseEntity<FacultyResponseDto> getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    // Example: POST /api/faculties with JSON body { "name": "Faculty of Science" }
    public FacultyModel createFaculty(@RequestBody FacultyModel faculty) {
        return facultyService.saveFaculty(faculty);
    }

    @PutMapping("/{id}")
    // Example: PUT /api/faculties/1 with JSON body { "name": "Updated Faculty Name" }
    public ResponseEntity<FacultyModel> updateFaculty(@PathVariable Long id, @RequestBody FacultyModel facultyDetails) {
        return ResponseEntity.ok(facultyService.updateFaculty(id, facultyDetails));
    }

    @DeleteMapping("/{id}")
    // Example: DELETE /api/faculties/1
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }
}
