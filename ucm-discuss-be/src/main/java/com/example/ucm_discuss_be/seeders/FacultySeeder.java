package com.example.ucm_discuss_be.seeders;

import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.faculties.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
@Order(1) // This ensures it runs first
public class FacultySeeder implements CommandLineRunner {

    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public void run(String... args) throws Exception {
        if (facultyRepository.count() == 0) {
            System.out.println("Seeding Faculties...");
            FacultyModel fsit = new FacultyModel();
            fsit.setName("School of Information Technology");

            FacultyModel fvcd = new FacultyModel();
            fvcd.setName("Faculty of Visual Communication Design");

            FacultyModel stie = new FacultyModel();
            stie.setName("Institute of Economic Science");

            facultyRepository.save(fsit);
            facultyRepository.save(fvcd);
            facultyRepository.save(stie);
            System.out.println("Faculties seeded.");
        }
    }
}