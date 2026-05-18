package com.example.ucm_discuss_be.seeders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.courses.CourseRepository;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;

@Component
@Profile("dev")
@Order(5)
public class ThreadSeeder implements CommandLineRunner {
    
    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        if (threadRepository.count() == 0) {
            System.out.println("Seeding Threads...");
            
            UserModel student = userRepository.findById((long) 1).orElseThrow();
            UserModel student2 = userRepository.findById((long) 2).orElseThrow();
            UserModel student3 = userRepository.findById((long) 3).orElseThrow();
            UserModel student6 = userRepository.findById((long) 6).orElseThrow();

            CourseModel ai = courseRepository.findById((long) 1).orElseThrow();
            CourseModel mobileDev = courseRepository.findById((long) 2).orElseThrow();
            CourseModel database = courseRepository.findById((long) 3).orElseThrow();
            CourseModel egi = courseRepository.findById((long) 4).orElseThrow();
            CourseModel accounting = courseRepository.findById((long) 5).orElseThrow();

            ThreadModel thread1 = new ThreadModel();
            thread1.setTitle("How to implement A* algorithm in Java?");
            thread1.setCourse(ai);
            thread1.setUser(student);
            thread1.setContent("I'm trying to implement the A* algorithm for a pathfinding project, but I'm not sure where to start. Can anyone provide some guidance or sample code in Java?");
            thread1.setIs_anon(false);

            ThreadModel thread2 = new ThreadModel();
            thread2.setTitle("Best practices for REST API design in Spring Boot?");
            thread2.setCourse(mobileDev);
            thread2.setUser(student2);
            thread2.setContent("What are some key principles to follow when designing RESTful APIs? I'm particularly interested in versioning and error handling.");
            thread2.setIs_anon(false);

            ThreadModel thread3 = new ThreadModel();
            thread3.setTitle("Understanding SQL Joins");
            thread3.setCourse(database);
            thread3.setUser(student3);
            thread3.setContent("Can someone explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN with simple examples? I keep getting them mixed up.");
            thread3.setIs_anon(true); // Example of an anonymous thread

            ThreadModel thread4 = new ThreadModel();
            thread4.setTitle("Final Project Ideas for English for Global Industry");
            thread4.setCourse(egi);
            thread4.setUser(student);
            thread4.setContent("Our lecturer asked us to propose a final project. Does anyone have interesting ideas that combine English communication and technology?");
            thread4.setIs_anon(false);

            ThreadModel thread5 = new ThreadModel();
            thread5.setTitle("Depreciation Methods in Accounting");
            thread5.setCourse(accounting);
            thread5.setUser(student6);
            thread5.setContent("What is the straight-line method versus the declining balance method for asset depreciation? Which one is more commonly used?");
            thread5.setIs_anon(false);

            threadRepository.saveAll(List.of(thread1, thread2, thread3, thread4, thread5));

            System.out.println("Threads seeded.");
        }
    }

}
