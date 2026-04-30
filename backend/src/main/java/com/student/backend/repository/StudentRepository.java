package com.student.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}