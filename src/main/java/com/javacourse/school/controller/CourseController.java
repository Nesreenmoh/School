package com.javacourse.school.controller;

import com.javacourse.school.models.Course;
import com.javacourse.school.models.Teacher;
import com.javacourse.school.repositories.CourseRepository;
import com.javacourse.school.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    @PostMapping
    public void addCourse(@RequestBody Course course) {
        courseRepository.save(course);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable Long courseId) {
        courseRepository.deleteById(courseId);
    }


    @PutMapping("/{courseId}")
    public Course updateTeacher(@RequestBody Course course){
        courseRepository.save(course);
        return course;
    }

    @GetMapping("/{teacherid}/courses")
    public List<Course> getCoursesByTeacherId (@PathVariable Long teacherid) {
       return courseRepository.findAllByTeacherId(teacherid);
    }

}
