package com.javacourse.school.repositories;

import com.javacourse.school.models.Course;
import com.javacourse.school.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher,Long> {

 public Teacher findOneByName(String name);
}
