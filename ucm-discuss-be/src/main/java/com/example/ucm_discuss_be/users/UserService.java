package com.example.ucm_discuss_be.users;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ucm_discuss_be.faculties.FacultyModel;
import com.example.ucm_discuss_be.faculties.FacultyRepository;
import com.example.ucm_discuss_be.faculties.FacultyResponseDto;
import com.example.ucm_discuss_be.majors.MajorModel;
import com.example.ucm_discuss_be.majors.MajorRepository;
import com.example.ucm_discuss_be.majors.MajorResponseDto;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.userViewedThreads.UserViewedThreadModel;
import com.example.ucm_discuss_be.userViewedThreads.UserViewedThreadRepository;
import com.example.ucm_discuss_be.faculties.FacultyRepository;
import com.example.ucm_discuss_be.faculties.FacultyResponseDto;

// Security imports
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

// import com.example.ucm_discuss_be.majors.UserModel;
// import com.example.ucm_discuss_be.majors.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MajorRepository majorRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private UserViewedThreadRepository userViewedThreadRepository;

    public List<UserResponseDto> getAllUsers() {
        List<UserModel> users = userRepository.findAll();
        List<UserResponseDto> responseList = new ArrayList<>();
        for (UserModel user : users) {
            responseList.add(convertToResponse(user));
        }
        return responseList;
    }

    public Optional<UserResponseDto> getUserById(Long id) {
        Optional<UserModel> userOpt = userRepository.findById(id);
        if (userOpt != null && userOpt.isPresent()) {
            UserResponseDto response = convertToResponse(userOpt.get());
            return Optional.of(response);
        }
        return Optional.empty();
    }

    public UserResponseDto getUserByEmail(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return profileResponse(user);
    }

    public UserResponseDto profileResponse(UserModel user) {
        UserResponseDto response = new UserResponseDto();
        response.setNim_or_nisn(user.getNim_or_nisn());
        response.setName(user.getName());
        response.setIs_anon(user.getIs_anon());

        if (user.getMajor() != null) {
            MajorResponseDto majorResponse = new MajorResponseDto();
            majorResponse.setId(user.getMajor().getId());
            majorResponse.setName(user.getMajor().getName());
            response.setMajor(majorResponse);
        }

        if (user.getFaculty() != null) {
            FacultyResponseDto facultyResponse = new FacultyResponseDto();
            facultyResponse.setId(user.getFaculty().getId());
            facultyResponse.setName(user.getFaculty().getName());
            response.setFaculty(facultyResponse);
        }

        return response;
    }

    public UserModel saveUser(UserCreationDto request) {
        UserModel user = new UserModel();
        user.setNim_or_nisn(request.getNim_or_nisn());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setIs_lecturer(request.getIs_lecturer());
        user.setIs_anon(request.getIs_anon());
        if (request.getMajor_id() != null) {
            MajorModel major = majorRepository.findById(request.getMajor_id())
                    .orElseThrow(() -> new RuntimeException("Major not found"));
            user.setMajor(major);
        }
        if (request.getFaculty_id() != null) {
            FacultyModel faculty = facultyRepository.findById(request.getFaculty_id())
                    .orElseThrow(() -> new RuntimeException("Faculty not found"));
            user.setFaculty(faculty);
        }
        return userRepository.save(user);
    }

    public UserResponseDto convertToResponse(UserModel user) {
        UserResponseDto response = new UserResponseDto();
        response.setId(user.getId());
        response.setNim_or_nisn(user.getNim_or_nisn());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setIs_lecturer(user.getIs_lecturer());
        response.setIs_anon(user.getIs_anon());

        if (user.getMajor() != null) {
            MajorResponseDto majorResponse = new MajorResponseDto();
            majorResponse.setId(user.getMajor().getId());
            majorResponse.setName(user.getMajor().getName());
            response.setMajor(majorResponse);
        }

        if (user.getFaculty() != null) {
            FacultyResponseDto facultyResponse = new FacultyResponseDto();
            facultyResponse.setId(user.getFaculty().getId());
            facultyResponse.setName(user.getFaculty().getName());
            response.setFaculty(facultyResponse);
        }

        return response;
    }

    public UserModel updateUser(Long id, UserUpdateDto userDetails) {
        UserModel user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (userDetails.getNim_or_nisn() != null) {
            user.setNim_or_nisn(userDetails.getNim_or_nisn());
        }
        if (userDetails.getName() != null) {
            user.setName(userDetails.getName());
        }
        if (userDetails.getEmail() != null) {
            user.setEmail(userDetails.getEmail());
        }
        if (userDetails.getIs_lecturer() != null) {
            user.setIs_lecturer(userDetails.getIs_lecturer());
        }
        if (userDetails.getIs_anon() != null) {
            user.setIs_anon(userDetails.getIs_anon());
        }
        if (userDetails.getMajor() != null) {
            MajorModel major = majorRepository.findById(userDetails.getMajor().getId())
                    .orElseThrow(() -> new RuntimeException("Major not found"));
            user.setMajor(major);
        }
        if (userDetails.getFaculty() != null) {
            FacultyModel faculty = facultyRepository.findById(userDetails.getFaculty().getId())
                    .orElseThrow(() -> new RuntimeException("Faculty not found"));
            user.setFaculty(faculty);
        }
        return userRepository.save(user);
    }

    @Transactional
    public UserResponseDto toggleAnonMode(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIs_anon(!user.getIs_anon());
        return convertToResponse(userRepository.save(user));
    }

    // NEW for Card 11
    @Transactional(readOnly = true)
    public List<ThreadModel> getRecentlyVisitedThreads(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userViewedThreadRepository.findRecentlyViewedByUserId(user.getId()).stream()
                .map(UserViewedThreadModel::getThread)
                .distinct()
                .collect(Collectors.toList());
    }

    // NEW for Card 11
    @Transactional
    public void recordThreadView(String email, Long threadId) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Optional<UserViewedThreadModel> existing = userViewedThreadRepository
                .findByUserIdAndThreadId(user.getId(), threadId);

        if (existing.isPresent()) {
            existing.get().setViewed_at(LocalDateTime.now());
            userViewedThreadRepository.save(existing.get());
        } else {
            ThreadModel thread = new ThreadModel();
            thread.setId(threadId);
            UserViewedThreadModel view = new UserViewedThreadModel();
            view.setUser(user);
            view.setThread(thread);
            view.setViewed_at(LocalDateTime.now());
            userViewedThreadRepository.save(view);
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    
        // Create a list of authorities based on whether the user is a lecturer
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (user.getIs_lecturer()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_DOSEN"));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_MAHASISWA"));
        }
        
        // Return a Spring Security User object
        // The password is empty since you don't use passwords in your login flow
        return new User(user.getEmail(), "", authorities);
    }
}
