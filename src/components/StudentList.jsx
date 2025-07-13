import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStudents, deleteStudent } from '../redux/studentSlice';
import '../style/App.css'; // 👈 Make sure this import exists

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(state => state.students);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not OK');
        return res.json();
      })
      .then(data => {
        dispatch(setStudents(data));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) return <p className="text-center mt-8 text-gray-500">Loading students...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

 return (
  <div className="student-list-page">
    <div className="container">
      <div className="top-bar">
        <h2 className="title">Student List</h2>
        <p className="count">Total Students: {students.length}</p>
        <button onClick={() => navigate('/add')} className="btn btn-add">
          ➕ Add Student
        </button>
      </div>

      <div className="student-grid">
        {students.map(student => (
          <div key={student.id} className="student-card">
            <h3 className="student-name">{student.name}</h3>
            <p className="student-info">📧 {student.email}</p>
            <p className="student-info">📞 {student.phone}</p>

            <div className="btn-group">
              <button onClick={() => navigate(`/student/${student.id}`)} className="btn btn-view">View</button>
              <button onClick={() => navigate(`/edit/${student.id}`)} className="btn btn-edit">Edit</button>
              <button onClick={() => handleDelete(student.id)} className="btn btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default StudentList;