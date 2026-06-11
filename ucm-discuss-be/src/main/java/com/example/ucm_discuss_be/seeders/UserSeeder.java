package com.example.ucm_discuss_be.seeders;

import com.example.ucm_discuss_be.faculties.FacultyRepository;
import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.majors.MajorModel;
import com.example.ucm_discuss_be.majors.MajorRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import java.util.concurrent.ThreadLocalRandom;

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
    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("ALTER TABLE users MODIFY COLUMN nim_or_nisn VARCHAR(50) NULL");
            System.out.println("Successfully altered users table to make nim_or_nisn nullable.");
        } catch (Exception e) {
            System.out.println("Could not alter users table: " + e.getMessage());
        }

        if (userRepository.count() == 0) {
            System.out.println("Seeding Users...");
            // MajorModel informaticsMajor =
            // majorRepository.findByName("Informatics").orElseThrow();

            MajorModel imt = majorRepository.findById((long) 1).orElseThrow();
            MajorModel vcd = majorRepository.findById((long) 2).orElseThrow();
            MajorModel man = majorRepository.findById((long) 3).orElseThrow();

            FacultyModel sift = facultyRepository.findById((long) 1).orElseThrow();
            FacultyModel fvcd = facultyRepository.findById((long) 2).orElseThrow();
            FacultyModel stie = facultyRepository.findById((long) 3).orElseThrow();

            UserModel student = new UserModel();
            student.setName("Keihan Pradika Muzaki");
            student.setNimOrNisn("00123456789");
            student.setEmail("kpradika@student.ciputra.ac.id");
            student.setIsLecturer(false);
            student.setIsAnon(false);
            student.setMajor(imt);
            student.setFaculty(sift);
            userRepository.save(student);

            UserModel student2 = new UserModel();
            student2.setName("Innocentia Handani");
            student2.setNimOrNisn("0012321139");
            student2.setEmail("ihandani@student.ciputra.ac.id");
            student2.setIsLecturer(false);
            student2.setIsAnon(false);
            student2.setMajor(imt);
            student2.setFaculty(sift);
            userRepository.save(student2);

            UserModel student3 = new UserModel();
            student3.setName("Nicholas Flamel");
            student3.setNimOrNisn("003727456789");
            student3.setEmail("nflamel@student.ciputra.ac.id");
            student3.setIsLecturer(false);
            student3.setIsAnon(false);
            student3.setMajor(vcd);
            student3.setFaculty(fvcd);
            userRepository.save(student3);

            UserModel student4 = new UserModel();
            student4.setName("Rachel Dawes");
            student4.setNimOrNisn("024322456789");
            student4.setEmail("rdawes@student.ciputra.ac.id");
            student4.setIsLecturer(false);
            student4.setIsAnon(false);
            student4.setMajor(vcd);
            student4.setFaculty(fvcd);
            userRepository.save(student4);

            UserModel student5 = new UserModel();
            student5.setName("Reinhart von Lohengramm");
            student5.setNimOrNisn("02222333789");
            student5.setEmail("rvlohengramm@student.ciputra.ac.id");
            student5.setIsLecturer(false);
            student5.setIsAnon(false);
            student5.setMajor(man);
            student5.setFaculty(stie);
            userRepository.save(student5);

            UserModel student6 = new UserModel();
            student6.setName("Celine Chandra");
            student6.setNimOrNisn("02222456789");
            student6.setEmail("cchandra@student.ciputra.ac.id");
            student6.setIsLecturer(false);
            student6.setIsAnon(false);
            student6.setMajor(man);
            student6.setFaculty(stie);
            userRepository.save(student6);

            UserModel lecturer = new UserModel();
            lecturer.setName("Dr. Pickles");
            lecturer.setNimOrNisn("98765432100");
            lecturer.setEmail("dr.pickles@example.com");
            lecturer.setIsLecturer(true);
            lecturer.setIsAnon(false);
            lecturer.setMajor(imt);
            lecturer.setFaculty(sift);
            userRepository.save(lecturer);

            System.out.println("Users seeded.");
        }

        // Inject data from JSON files
        injectJsonUsers();
    }

    private void injectJsonUsers() throws Exception {
        System.out.println("Injecting users from JSON files...");

        Set<String> existingEmails = userRepository.findAll().stream()
                .map(UserModel::getEmail)
                .collect(Collectors.toSet());

        Set<String> existingNims = userRepository.findAll().stream()
                .map(UserModel::getNimOrNisn)
                .filter(nim -> nim != null && !nim.isBlank())
                .collect(Collectors.toSet());

        List<MajorModel> allMajors = majorRepository.findAll();
        List<FacultyModel> allFaculties = facultyRepository.findAll();

        ObjectMapper mapper = new ObjectMapper();

        for (String filename : List.of("ucm2023.json", "ucm2024.json", "ucm2025.json")) {
            String resourcePath = "seeders/" + filename;
            org.springframework.core.io.ClassPathResource resource = new org.springframework.core.io.ClassPathResource(resourcePath);
            if (!resource.exists()) {
                System.out.println("Seeder file " + filename + " not found in classpath, skipping.");
                continue;
            }

            System.out.println("Processing " + filename + " from classpath...");
            try (java.io.InputStream inputStream = resource.getInputStream()) {
                List<Map<String, Object>> usersList = mapper.readValue(inputStream, List.class);
                int countInserted = 0;

                for (Map<String, Object> item : usersList) {
                    String email = (String) item.get("email");
                    if (email == null || email.isBlank()) {
                        continue;
                    }
                    if (existingEmails.contains(email)) {
                        continue; // Skip if email already exists
                    }

                    UserModel user = new UserModel();
                    user.setEmail(email);

                    String name = (String) item.get("name");
                    user.setName(name != null && !name.isBlank() ? name : "User");

                    Boolean isLecturer = (Boolean) item.get("isLecturer");
                    user.setIsLecturer(isLecturer != null ? isLecturer : false);

                    Boolean isAnon = (Boolean) item.get("isAnon");
                    user.setIsAnon(isAnon != null ? isAnon : false);

                    if (!allMajors.isEmpty()) {
                        user.setMajor(allMajors.get(ThreadLocalRandom.current().nextInt(allMajors.size())));
                    }
                    if (!allFaculties.isEmpty()) {
                        user.setFaculty(allFaculties.get(ThreadLocalRandom.current().nextInt(allFaculties.size())));
                    }

                    // Handle nimOrNisn uniqueness & length constraint [5, 50]
                    String nim = (String) item.get("nimOrNisn");
                    if (nim == null || nim.isBlank()) {
                        nim = null;
                    }

                    if (nim != null) {
                        if (nim.length() > 50) {
                            nim = nim.substring(0, 50);
                        }

                        String candidateNim = nim;
                        int count = 1;
                        while (existingNims.contains(candidateNim)) {
                            String suffix = String.valueOf(count);
                            if (nim.length() + suffix.length() > 50) {
                                candidateNim = nim.substring(0, 50 - suffix.length()) + suffix;
                            } else {
                                candidateNim = nim + suffix;
                            }
                            count++;
                        }
                        nim = candidateNim;
                        existingNims.add(nim);
                    }

                    user.setNimOrNisn(nim);

                    userRepository.save(user);
                    existingEmails.add(email);
                    countInserted++;
                }
                System.out.println("Finished " + filename + ": Inserted " + countInserted + " new users.");
            }
        }
    }
}
