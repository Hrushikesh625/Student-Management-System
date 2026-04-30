import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Single student form data
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: ""
  });

  // Student list
  const [students, setStudents] = useState([]);

  // Destructure form values
  const { name, email, course } = student;

  // Load all students when page opens
  useEffect(() => {
    loadStudents();
  }, []);

  // GET all students
  const loadStudents = async () => {
    const result = await axios.get("http://localhost:8080/students");
    setStudents(result.data);
  };

  // DELETE student
  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/student/${id}`);
    loadStudents();
  };

  // Handle input changes
  const onInputChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // POST new student
  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/student", student);

    alert("Student Added Successfully!");

    // Clear form
    setStudent({
      name: "",
      email: "",
      course: ""
    });

    // Reload student list
    loadStudents();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Student Management System</h1>

      {/* Form */}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={onInputChange}
          required
        />
        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={onInputChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={course}
          onChange={onInputChange}
          required
        />
        <br />
        <br />

        <button type="submit">Add Student</button>
      </form>

      <br />
      <br />

      {/* Student Table */}
      <h2>Student List</h2>

      <table border="1" align="center" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>
                <button onClick={() => deleteStudent(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;