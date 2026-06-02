package com.example.ucm_discuss_be.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EnvTest {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @PostConstruct
    public void test() {
        System.out.println("DB URL = " + dbUrl);
    }
}