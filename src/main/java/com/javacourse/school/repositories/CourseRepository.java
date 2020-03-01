package com.javacourse.school.repositories;

import com.javacourse.school.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    public List<Course> findAllByTeacherId(Long id);
}
