package com.course_manage.cms.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "course")
public class Course {

    @Id
    private String courseId;
    @Column(nullable = false)
    private String courseName;
    @Column(nullable = false)
    private String teacherName;
    private String courseDescription;
    @Column(nullable = false)
    private double coursePrice;
    private int no_of_weeks;
    private Boolean isActive;
    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @Transient
    @ManyToMany(mappedBy = "courses")
    private Set<User> users = new HashSet<>();

    @Transient
    private List<Long> userIds;
}
