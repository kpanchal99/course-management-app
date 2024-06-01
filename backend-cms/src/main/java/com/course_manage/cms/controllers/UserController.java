package com.course_manage.cms.controllers;

import com.course_manage.cms.dto.UserLogin;
import com.course_manage.cms.dto.UserRegister;
import com.course_manage.cms.entities.User;
import com.course_manage.cms.services.UserService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1", produces = "application/json")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserLogin> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        UserLogin user = userService.login(email, password);
        if (user.getStatus() ==  "success") {
            return new ResponseEntity( user , HttpStatus.CREATED);
        }
        return new ResponseEntity(user,HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ResponseEntity signup(@RequestBody Map<String, String> request) {
        String email = (String) request.get("email");
        String password = (String) request.get("password");
        Boolean isAdmin = request.get("isAdmin") == "true" ? true : false;
        UserRegister user = userService.signup(email, password, isAdmin);
        if (user.getStatus() == "success") {
            return new ResponseEntity( user, HttpStatus.CREATED);

        }
        return new ResponseEntity( user, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/enroll")
    @ResponseStatus(HttpStatus.OK)
    public String enrollCourse(@RequestParam Integer userId, @RequestParam String courseId) {
        boolean success = userService.enrollCourse(userId, courseId);
        if (success) {
            return "Enrollment successful for user ID: " + userId;
        }
        return "Enrollment failed. Invalid user ID or course ID.";
    }

    @GetMapping("/usersByCourse")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUsersByCourse(@RequestParam String courseId) {
        return userService.getUsersByCourse(courseId);
    }
}
