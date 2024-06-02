package com.course_manage.cms.controllers;

import com.course_manage.cms.entities.Course;
import com.course_manage.cms.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/addCourse")
    @ResponseStatus(HttpStatus.CREATED)
    public Course addCourse(@RequestBody Course course) {
        return adminService.addCourse(course);
    }

    //deleting but no response and wrong status code
    @DeleteMapping("/deleteCourse")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@RequestParam String courseId) {
        adminService.deleteCourse(courseId);
    }

    //update status code 
    @PutMapping("/updateCourse")
    public Course updateCourse(@RequestParam String courseId, @RequestBody Course updatedCourse) {
        return adminService.updateCourse(courseId, updatedCourse);
    }
}