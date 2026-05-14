package com.example.ucm_discuss_be.users;

// import com.example.ucm_discuss_be.users.UserModel;
// import com.example.ucm_discuss_be.users.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    // @Autowired
    private UserRepository userRepository;

    // public List<UserModel> getAllUsers() {
    //     return userRepository.findAll();
    // }

    // public Optional<UserModel> getUserById(Long id) {
    //     return userRepository.findById(id);
    // }

    // public UserModel createUser(UserModel user) {
    //     return userRepository.save(user);
    // }

    // public void deleteUser(Long id) {
    //     userRepository.deleteById(id);
    // }
   
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel user = userRepository.getUserByEmail(email);
        if (user == null) throw new UsernameNotFoundException("User not found");

        // Determine the role based on the is_lecturer flag
        String role = user.getIs_lecturer() ? "LECTURER" : "STUDENT";

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password("{noop}" + user.getPassword())
                .roles(role)
                .build();
    }
}
