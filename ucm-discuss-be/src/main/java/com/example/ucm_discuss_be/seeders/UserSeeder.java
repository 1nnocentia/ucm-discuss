package com.example.ucm_discuss_be.seeders;

import com.example.ucm_discuss_be.faculties.FacultyRepository;
import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.majors.MajorModel;
import com.example.ucm_discuss_be.majors.MajorRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("dev")
@Order(4) // Runs last
public class UserSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MajorRepository majorRepository;
    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Seeding Users...");
            // MajorModel informaticsMajor = majorRepository.findByName("Informatics").orElseThrow();

            MajorModel imt = majorRepository.findById((long) 1).orElseThrow();
            MajorModel vcd = majorRepository.findById((long) 2).orElseThrow();
            MajorModel acc = majorRepository.findById((long) 3).orElseThrow();

            FacultyModel sift = facultyRepository.findById((long) 1).orElseThrow();
            FacultyModel fvcd = facultyRepository.findById((long) 2).orElseThrow();
            FacultyModel fbe = facultyRepository.findById((long) 3).orElseThrow();

            UserModel studentUser = new UserModel();
            studentUser.setName("Adam Student");
            studentUser.setNim_or_nisn("00123456789");
            studentUser.setEmail("adam.student@example.com");
            studentUser.setPassword("password123");
            studentUser.setIs_lecturer(false);
            studentUser.setIs_anon(false);
            studentUser.setMajor(imt);
            studentUser.setFaculty(sift);

            UserModel lecturerUser = new UserModel();
            lecturerUser.setName("Dr. Pickles");
            lecturerUser.setNim_or_nisn("98765432100");
            lecturerUser.setEmail("dr.pickles@example.com");
            lecturerUser.setPassword("password123");
            lecturerUser.setIs_lecturer(true);
            lecturerUser.setIs_anon(false);
            lecturerUser.setMajor(vcd);
            lecturerUser.setFaculty(fvcd);

            userRepository.saveAll(List.of(studentUser, lecturerUser));
            System.out.println("Users seeded.");
        }
    }
}