package com.course_manage.cms.repository;

import com.course_manage.cms.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    // Find courses by course name
    List<Course> findByCourseName(String courseName);

    // Find courses by course id
    Course findByCourseId(String id);

    // Find courses by teacher name
    List<Course> findByTeacherName(String teacherName);

    // Find active courses
    List<Course> findByIsActive(Boolean isActive);

    // Find courses by price range
    List<Course> findByCoursePriceBetween(Double minPrice, Double maxPrice);

    // Find user IDs associated with a course
    @Query("SELECT u.id FROM User u JOIN u.courses c WHERE c.courseId = :courseId")
    List<Long> findUserIdsByCourseId(String courseId);
}
