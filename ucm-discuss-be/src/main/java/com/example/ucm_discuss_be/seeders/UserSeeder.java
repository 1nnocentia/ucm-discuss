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

// import java.util.List;

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
            MajorModel man = majorRepository.findById((long) 3).orElseThrow();

            FacultyModel sift = facultyRepository.findById((long) 1).orElseThrow();
            FacultyModel fvcd = facultyRepository.findById((long) 2).orElseThrow();
            FacultyModel stie = facultyRepository.findById((long) 3).orElseThrow();

            UserModel student = new UserModel();
            student.setName("Keihan Pradika Muzaki");
            student.setNim_or_nisn("00123456789");
            student.setEmail("kpradika@student.ciputra.ac.id");
            student.setPassword("password123");
            student.setIs_lecturer(false);
            student.setIs_anon(false);
            student.setMajor(imt);
            student.setFaculty(sift);
            userRepository.save(student);

            UserModel student2 = new UserModel();
            student2.setName("Innocentia Handani");
            student2.setNim_or_nisn("0012321139");
            student2.setEmail("ihandani@student.ciputra.ac.id");
            student2.setPassword("password123");
            student2.setIs_lecturer(false);
            student2.setIs_anon(false);
            student2.setMajor(imt);
            student2.setFaculty(sift);
            userRepository.save(student2);

            UserModel student3 = new UserModel();
            student3.setName("Nicholas Flamel");
            student3.setNim_or_nisn("003727456789");
            student3.setEmail("nflamel@student.ciputra.ac.id");
            student3.setPassword("password123");
            student3.setIs_lecturer(false);
            student3.setIs_anon(false);
            student3.setMajor(vcd);
            student3.setFaculty(fvcd);
            userRepository.save(student3);

            UserModel student4 = new UserModel();
            student4.setName("Rachel Dawes");
            student4.setNim_or_nisn("024322456789");
            student4.setEmail("rdawes@student.ciputra.ac.id");
            student4.setPassword("password123");
            student4.setIs_lecturer(false);
            student4.setIs_anon(false);
            student4.setMajor(vcd);
            student4.setFaculty(fvcd);
            userRepository.save(student4);

            UserModel student5 = new UserModel();
            student5.setName("Reinhart von Lohengramm");
            student5.setNim_or_nisn("02222333789");
            student5.setEmail("rvlohengramm@student.ciputra.ac.id");
            student5.setPassword("password123");
            student5.setIs_lecturer(false);
            student5.setIs_anon(false);
            student5.setMajor(man);
            student5.setFaculty(stie);
            userRepository.save(student5);

            UserModel student6 = new UserModel();
            student6.setName("Celine Chandra");
            student6.setNim_or_nisn("02222456789");
            student6.setEmail("cchandra@student.ciputra.ac.id");
            student6.setPassword("password123");
            student6.setIs_lecturer(false);
            student6.setIs_anon(false);
            student6.setMajor(man);
            student6.setFaculty(stie);
            userRepository.save(student6);

            UserModel lecturer = new UserModel();
            lecturer.setName("Dr. Pickles");
            lecturer.setNim_or_nisn("98765432100");
            lecturer.setEmail("dr.pickles@example.com");
            lecturer.setPassword("password123");
            lecturer.setIs_lecturer(true);
            lecturer.setIs_anon(false);
            lecturer.setMajor(imt);
            lecturer.setFaculty(sift);
            userRepository.save(lecturer);
                      

            // userRepository.saveAll(List.of(studentUser, lecturerUser));
            System.out.println("Users seeded.");
        }
    }
}