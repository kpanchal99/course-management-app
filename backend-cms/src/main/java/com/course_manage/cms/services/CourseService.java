package com.course_manage.cms.services;

import com.course_manage.cms.entities.Course;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CourseService {

    public List<Course> courseList;

    public CourseService(){
        courseList = new ArrayList<>();

        UUID uuid = UUID.randomUUID();
        System.out.println(uuid.toString());
        String str = "a180260c-aefb-41ee-9b3b-5e229db629f0";
//        Course course1 = new Course(str,"Course 1","Karan","sdfdsfsdfsdfsdfsdf",2999,20,false,new Date(),new Date());
//        Course course2 = new Course(str,"Course 2","Karan","sdfdsfsdfsdfsdfsdf",2999,20,true,new Date(),new Date());
//        courseList.addAll(Arrays.asList(course1,course2));
    }
    public Course getCourse(String id) {
        for (Course course : courseList) {
            if (course.getCourseId().equals(id)) {
                return course;
            }
        }
        return null;
    }
}
