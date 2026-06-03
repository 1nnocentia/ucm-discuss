package com.example.ucm_discuss_be.seeders;

// import com.example.ucm_discuss_be.faculties.FacultyModel;
// import com.example.ucm_discuss_be.faculties.FacultyRepository;
import com.example.ucm_discuss_be.majors.MajorModel;
import com.example.ucm_discuss_be.majors.MajorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("dev")
@Order(2) // Runs after FacultySeeder
public class MajorSeeder implements CommandLineRunner {

    @Autowired
    private MajorRepository majorRepository;
    // @Autowired
    // private FacultyRepository facultyRepository;

    @Override
    public void run(String... args) throws Exception {
        if (majorRepository.count() == 0) {
            System.out.println("Seeding Majors...");

            MajorModel imt = new MajorModel();
            imt.setName("AI");

            MajorModel vcd = new MajorModel();
            vcd.setName("GD");

            MajorModel man = new MajorModel();
            man.setName("IBM");

            majorRepository.saveAll(List.of(imt, vcd, man));
            System.out.println("Majors seeded.");
        }
    }
}