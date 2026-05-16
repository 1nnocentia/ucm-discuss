package com.example.ucm_discuss_be.majors;

// import com.example.ucm_discuss_be.majors.MajorModel;
// import com.example.ucm_discuss_be.majors.MajorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MajorService {

    @Autowired
    private MajorRepository majorRepository;

    public List<MajorModel> getAllMajors() {
        return majorRepository.findAll();
    }

    public Optional<MajorModel> getMajorById(Long id) {
        return majorRepository.findById(id);
    }

    public MajorModel saveMajor(MajorModel major) {
        return majorRepository.save(major);
    }

    public MajorModel updateMajor(Long id, MajorModel majorDetails) {
        MajorModel major = majorRepository.findById(id).orElseThrow(() -> new RuntimeException("Major not found"));
        major.setName(majorDetails.getName());
        return majorRepository.save(major);
    }

    public void deleteMajor(Long id) {
        majorRepository.deleteById(id);
    }
}
