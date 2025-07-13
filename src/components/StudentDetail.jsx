import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const students = useSelector(state => state.students);

  // Convert ID to number for comparison
  const student = students.find(s => s.id === Number(id));

  if (!student) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Student Not Found</h2>
        <button onClick={() => navigate('/students')}>← Back to List</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Student Details</h2>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>

      <button onClick={() => navigate('/students')} style={{ marginTop: '1rem' }}>
        ← Back to List
      </button>
    </div>
  );
};

export default StudentDetail;