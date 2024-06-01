package com.course_manage.cms.controllers;


import com.course_manage.cms.entities.Course;
import com.course_manage.cms.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CourseController {

    private CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService){
        this.courseService = courseService;
    }

    @GetMapping("/getCourse")
    @ResponseStatus(HttpStatus.OK)
    public Course getCourseById(@RequestParam String id){
        return courseService.getCourse(id);
    }

    @GetMapping("/getCourseList/{id}")
    public List<Course> getCourseList(){
        return  courseService.courseList;
    }
}
