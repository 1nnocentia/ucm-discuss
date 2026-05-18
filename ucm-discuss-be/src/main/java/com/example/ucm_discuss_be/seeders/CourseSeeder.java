package com.example.ucm_discuss_be.seeders;

import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.courses.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("dev")
@Order(3) // Runs after Majors
public class CourseSeeder implements CommandLineRunner {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        if (courseRepository.count() == 0) {
            System.out.println("Seeding Courses...");
            CourseModel ai = new CourseModel();
            ai.setCourse_code("AI101");
            ai.setCourse_name("Artificial Intelligence");
            ai.setYear("2026");

            CourseModel mobileDev = new CourseModel();
            mobileDev.setCourse_code("MD101");
            mobileDev.setCourse_name("Mobile Development");
            mobileDev.setYear("2026");

            CourseModel database = new CourseModel();
            database.setCourse_code("DB101");
            database.setCourse_name("Database Systems");
            database.setYear("2026");

            CourseModel algoDes = new CourseModel();
            algoDes.setCourse_code("AD101");
            algoDes.setCourse_name("Algorithm Design");
            algoDes.setYear("2026");

            CourseModel softwareEng = new CourseModel();
            softwareEng.setCourse_code("SE101");
            softwareEng.setCourse_name("Software Engineering");
            softwareEng.setYear("2026");
            mobileDev.setYear("2026");

            courseRepository.saveAll(List.of(ai, mobileDev, database, algoDes, softwareEng));
            System.out.println("Courses seeded.");
        }
    }
}