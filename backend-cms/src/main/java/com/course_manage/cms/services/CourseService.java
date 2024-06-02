package com.course_manage.cms.services;

import com.course_manage.cms.entities.Course;
import com.course_manage.cms.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course getCourse(String id) {
        return courseRepository.findByCourseId(id);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesByCourseName(String courseName) {
        return courseRepository.findByCourseName(courseName);
    }

    public List<Course> getCoursesByTeacherName(String teacherName) {
        return courseRepository.findByTeacherName(teacherName);
    }

    public List<Course> getActiveCourses() {
        return courseRepository.findByIsActive(true);
    }

    public List<Course> getCoursesByPriceRange(Double minPrice, Double maxPrice) {
        return courseRepository.findByCoursePriceBetween(minPrice, maxPrice);
    }
}
