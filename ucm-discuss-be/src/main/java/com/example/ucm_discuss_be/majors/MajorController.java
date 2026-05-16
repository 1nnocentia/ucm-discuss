package com.example.ucm_discuss_be.majors;

// import com.example.ucm_discuss_be.majors.MajorModel;
// import com.example.ucm_discuss_be.majors.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/majors")
public class MajorController {
    @Autowired
    private MajorService majorService;

    @GetMapping
    // Example: GET /api/majors
    public List<MajorModel> getAllMajors() {
        return majorService.getAllMajors();
    }

    @GetMapping("/{id}")
    // Example: GET /api/majors/1
    public ResponseEntity<MajorModel> getMajorById(@PathVariable Long id) {
        return majorService.getMajorById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    // Example: POST /api/majors with JSON body { "name": "Computer Science" }
    public MajorModel createMajor(@Valid @RequestBody MajorModel major) {
        return majorService.saveMajor(major);
    }

    @PutMapping("/{id}")
    // Example: PUT /api/majors/1 with JSON body { "name": "Updated Major Name" }
    public ResponseEntity<MajorModel> updateMajor(@PathVariable Long id, @Valid @RequestBody MajorModel majorDetails) {
        return ResponseEntity.ok(majorService.updateMajor(id, majorDetails));
    }

    @DeleteMapping("/{id}")
    // Example: DELETE /api/majors/1
    public ResponseEntity<Void> deleteMajor(@PathVariable Long id) {
        majorService.deleteMajor(id);
        return ResponseEntity.noContent().build();
    }
}
