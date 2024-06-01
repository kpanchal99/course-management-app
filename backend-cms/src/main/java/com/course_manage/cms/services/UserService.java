package com.course_manage.cms.services;

import com.course_manage.cms.dto.UserLogin;
import com.course_manage.cms.dto.UserRegister;
import com.course_manage.cms.entities.Course;
import com.course_manage.cms.entities.User;
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
        UserLogin user = new UserLogin();
        if (userRepository.existsByEmailAndPassword(email, password)) {
            // user exist give JWT token
            String token = UUID.randomUUID().toString();
            user.setStatus("success");
            user.setEmail(email);
            user.setToken(token);
            return user;
        }
        // user does not exist
        user.setStatus("failed");
        user.setEmail(email);
        user.setToken(null);
        return null;
    }

    public boolean enrollCourse(Integer userId, String courseId) {
        Optional<User> userOptional = userList.stream().filter(u -> u.getId().equals(userId)).findFirst();
        Optional<Course> courseOptional = courseList.stream().filter(c -> c.getCourseId().equals(courseId)).findFirst();
        if (userOptional.isPresent() && courseOptional.isPresent()) {
            User user = userOptional.get();
            Course course = courseOptional.get();
            user.getCourses().add(course);
            return true;
        }
        return false;
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
