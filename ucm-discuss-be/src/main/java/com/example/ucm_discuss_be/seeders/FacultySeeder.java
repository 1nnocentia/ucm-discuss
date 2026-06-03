package com.example.ucm_discuss_be.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.faculties.FacultyRepository;

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
            fsit.setName("IMT");

            FacultyModel fvcd = new FacultyModel();
            fvcd.setName("VCD");

            FacultyModel stie = new FacultyModel();
            stie.setName("MAN");

            facultyRepository.save(fsit);
            facultyRepository.save(fvcd);
            facultyRepository.save(stie);
            System.out.println("Faculties seeded.");
        }
    }
}