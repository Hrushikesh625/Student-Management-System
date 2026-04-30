import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [students, setStudents] = useState([]);

  const { name, email, course } = student;

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios.get("http://localhost:8080/students");
    setStudents(result.data);
  };

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/student", student);
    alert("Student Added Successfully!");
    setStudent({
      name: "",
      email: "",
      course: ""
    });
    loadStudents();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Student Management System</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={onInputChange}
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={onInputChange}
        />
        <br /><br />

        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={course}
          onChange={onInputChange}
        />
        <br /><br />

        <button type="submit">Add Student</button>
      </form>

      <br /><br />

      <h2>Student List</h2>

      <table border="1" align="center" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;