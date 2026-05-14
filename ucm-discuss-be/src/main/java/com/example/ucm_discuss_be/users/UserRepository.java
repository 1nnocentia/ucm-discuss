package com.example.ucm_discuss_be.users;

// import com.example.ucm_discuss_be.users.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserModel getUserByEmail(String email);
}
