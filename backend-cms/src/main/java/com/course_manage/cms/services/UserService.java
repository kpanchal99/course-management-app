package com.course_manage.cms.services;

import com.course_manage.cms.dto.EnrollmentResponse;
import com.course_manage.cms.dto.UserLogin;
import com.course_manage.cms.dto.UserRegister;
import com.course_manage.cms.entities.Course;
import com.course_manage.cms.entities.User;
import com.course_manage.cms.repository.CourseRepository;
import com.course_manage.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;
    private List<User> userList = new ArrayList<>();
    private List<Course> courseList = new ArrayList<>();

    public UserService() {

    }

    public UserRegister signup(String email, String password, boolean isAdmin) {
        UserRegister user = new UserRegister();
        user.setEmail(email);

        // email exist user exist
        if (userRepository.existsByEmail(email)) {
            user.setStatus("failed");
            return user;
        }
        // insert to db
        // bcrpt code here
        userRepository.insertUser(email, password, isAdmin);
        user.setStatus("success");
        return user;
    }

    public UserLogin login(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        System.out.println();
        UserLogin userLogin = new UserLogin();
        if (user != null) {
            // user exist give JWT token
            String token = UUID.randomUUID().toString();
            userLogin.setStatus("success");
            userLogin.setEmail(email);
            userLogin.setToken(token);
            userLogin.setIsAdmin(user.isAdmin());
            userLogin.setId(user.getId());
            return userLogin;
        }
        // user does not exist
        userLogin.setStatus("failed");
        userLogin.setEmail(email);
        userLogin.setToken(null);
        return null;
    }

    public EnrollmentResponse enrollCourse(Integer userId, String courseId) {
        Optional<User> userOptional = userRepository.findById(userId.longValue());
        Optional<Course> courseOptional = courseRepository.findById(courseId);
        if (userOptional.isPresent() && courseOptional.isPresent()) {
            User user = userOptional.get();
            Course course = courseOptional.get();
            user.getCourses().add(course);
            userRepository.save(user);
            return new EnrollmentResponse("success", "Enrollment successful for Course ID: " + courseId);
        }
        return new EnrollmentResponse("failed", "");
    }

    public List<User> getUsersByCourse(String courseId) {
        List<User> enrolledUsers = new ArrayList<>();
        for (User user : userList) {
            for (Course course : user.getCourses()) {
                if (course.getCourseId().equals(courseId)) {
                    enrolledUsers.add(user);
                }
            }
        }
        return enrolledUsers;
    }
}
