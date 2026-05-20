package com.example.ucm_discuss_be.majors;

// import com.example.ucm_discuss_be.majors.MajorModel;
// import com.example.ucm_discuss_be.majors.MajorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MajorService {

    @Autowired
    private MajorRepository majorRepository;

    public List<MajorResponseDto> getAllMajors() {
        List<MajorModel> majors = majorRepository.findAll();
        List<MajorResponseDto> responseList = new ArrayList<>();
        for (MajorModel major : majors) {
            responseList.add(convertToResponse(major));
        }
        return responseList;
    }

    public Optional<MajorResponseDto> getMajorById(Long id) {
        Optional<MajorModel> major = majorRepository.findById(id);
        if (major != null && major.isPresent()) {
            MajorResponseDto response = convertToResponse(major.get());
            return Optional.of(response);
        }
        return Optional.empty();
    }

    public MajorModel saveMajor(MajorModel major) {
        return majorRepository.save(major);
    }

    public MajorModel updateMajor(Long id, MajorModel majorDetails) {
        MajorModel major = majorRepository.findById(id).orElseThrow(() -> new RuntimeException("Major not found"));
        major.setName(majorDetails.getName());
        return majorRepository.save(major);
    }

    public MajorResponseDto convertToResponse(MajorModel major) {
        MajorResponseDto response = new MajorResponseDto();
        response.setId(major.getId());
        response.setName(major.getName());
        return response;
    }

    public void deleteMajor(Long id) {
        majorRepository.deleteById(id);
    }
}
