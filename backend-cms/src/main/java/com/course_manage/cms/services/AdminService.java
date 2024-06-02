package com.course_manage.cms.services;

import com.course_manage.cms.entities.Course;
import com.course_manage.cms.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Course addCourse(Course course) {
        course.setCourseId(UUID.randomUUID().toString());
        return adminRepository.save(course);
    }

    public void deleteCourse(String courseId) {
        adminRepository.deleteById(courseId);
    }

    public Course updateCourse(String courseId, Course updatedCourse) {
        Optional<Course> optionalCourse = adminRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course existingCourse = optionalCourse.get();
            existingCourse.setCourseName(updatedCourse.getCourseName());
            existingCourse.setTeacherName(updatedCourse.getTeacherName());
            existingCourse.setCourseDescription(updatedCourse.getCourseDescription());
            existingCourse.setCoursePrice(updatedCourse.getCoursePrice());
            existingCourse.setNo_of_weeks(updatedCourse.getNo_of_weeks());
            existingCourse.setIsActive(updatedCourse.getIsActive());
            return adminRepository.save(existingCourse);
        }
        return null;
    }
}
