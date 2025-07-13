import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setStudents, deleteStudent } from '../redux/studentSlice';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(state => state.students);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch from API or json-server
  useEffect(() => {
    axios.get('http://localhost:5000/students') // or your API URL
      .then(res => {
        dispatch(setStudents(res.data));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Student List</h2>

      <p>Total Students: <strong>{students.length}</strong></p> {/* ✅ Total Count */}

      <button onClick={() => navigate('/add')} style={{ marginBottom: '1rem' }}>
        ➕ Add Student
      </button>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map(student => (
            <li key={student.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <strong>{student.name}</strong> — {student.email}
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => navigate(`/student/${student.id}`)}>👁 View</button>{' '}
                <button onClick={() => navigate(`/edit/${student.id}`)}>✏️ Edit</button>{' '}
                <button onClick={() => handleDelete(student.id)}>🗑 Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;