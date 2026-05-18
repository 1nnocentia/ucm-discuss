package com.example.ucm_discuss_be.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.example.ucm_discuss_be.courses.CourseRepository;
import com.example.ucm_discuss_be.threads.ThreadRepository;
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
            // Here you can create and save some ThreadModel instances
            // Example:
            // ThreadModel thread = new ThreadModel();
            // thread.setTitle("Example Thread");
            // thread.setContent("This is an example thread content.");
            // thread.setUser(userRepository.findById(1L).orElseThrow());
            // thread.setCourse(courseRepository.findById(1L).orElseThrow());
            // threadRepository.save(thread);
            System.out.println("Threads seeded.");
        }
    }

}
