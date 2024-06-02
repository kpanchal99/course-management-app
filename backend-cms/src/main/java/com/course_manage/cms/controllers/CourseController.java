package com.course_manage.cms.controllers;

import com.course_manage.cms.entities.Course;
import com.course_manage.cms.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/getCourseById")
    @ResponseStatus(HttpStatus.OK)
    public Course getCourseById(@RequestParam String id) {
        return courseService.getCourse(id);
    }

    @GetMapping("/getCourseList")
    public List<Course> getCourseList() {
        return courseService.getAllCourses();
    }

    @GetMapping("/getCoursesByCourseName")
    public List<Course> getCoursesByCourseName(@RequestParam String courseName) {
        return courseService.getCoursesByCourseName(courseName);
    }

    @GetMapping("/getCoursesByTeacherName")
    public List<Course> getCoursesByTeacherName(@RequestParam String teacherName) {
        return courseService.getCoursesByTeacherName(teacherName);
    }

    @GetMapping("/getActiveCourses")
    public List<Course> getActiveCourses() {
        return courseService.getActiveCourses();
    }

    @GetMapping("/getCoursesByPriceRange")
    public List<Course> getCoursesByPriceRange(@RequestParam Double minPrice, @RequestParam Double maxPrice) {
        return courseService.getCoursesByPriceRange(minPrice, maxPrice);
    }
}
