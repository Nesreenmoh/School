package com.javacourse.school.controller;

import com.javacourse.school.models.Teacher;
import com.javacourse.school.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/teacher")
public class TeatcherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<Teacher> getTeachers() {
        return teacherRepository.findAll();


    }

    @GetMapping("/{teacherName}")
    public Teacher getTeacherByTeacherName(@PathVariable String teacherName){
        return teacherRepository.findOneByName(teacherName);
    }
    @PostMapping
    public void addTeacher(@RequestBody Teacher teacher){


        teacherRepository.save(teacher);
    }

    @PutMapping("/{teacherId}")
    public Teacher updateTeacher(@RequestBody Teacher teacher){
        teacherRepository.save(teacher);
        return teacher;
    }

    @DeleteMapping("/{teacherId}")
    public void deleteTeacher(@PathVariable Long teacherId) {
        teacherRepository.deleteById(teacherId);
    }


}
