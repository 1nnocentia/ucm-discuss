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
            CourseModel progFundamentals = new CourseModel();
            progFundamentals.setCourse_code("CS101");
            progFundamentals.setCourse_name("Programming Fundamentals");
            progFundamentals.setYear("2024");

            CourseModel webDesign = new CourseModel();
            webDesign.setCourse_code("WD202");
            webDesign.setCourse_name("Web Design");
            webDesign.setYear("2024");

            courseRepository.saveAll(List.of(progFundamentals, webDesign));
            System.out.println("Courses seeded.");
        }
    }
}