import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const students = useSelector(state => state.students);
  const student = students.find(s => String(s.id) === id);

  if (!student) {
    return <p style={{ color: 'red' }}>Student not found.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>

      <button onClick={() => navigate('/students')}>← Back to Student List</button>
    </div>
  );
};

export default StudentDetail;