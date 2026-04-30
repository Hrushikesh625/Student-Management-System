package com.student.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.student.backend.model.Student;
import com.student.backend.repository.StudentRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping("/student")
    Student newStudent(@RequestBody Student newStudent) {
        return studentRepository.save(newStudent);
    }

    @GetMapping("/students")
    List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PutMapping("/student/{id}")
public Student updateStudent(@RequestBody Student newStudent, @PathVariable Long id) {
    return studentRepository.findById(id)
        .map(student -> {
            student.setName(newStudent.getName());
            student.setEmail(newStudent.getEmail());
            student.setCourse(newStudent.getCourse());
            return studentRepository.save(student);
        }).orElseThrow();
}

    @DeleteMapping("/student/{id}")
public String deleteStudent(@PathVariable Long id) {
    studentRepository.deleteById(id);
    return "Student deleted successfully";
}

}