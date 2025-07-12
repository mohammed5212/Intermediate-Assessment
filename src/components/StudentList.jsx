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

  // Fetch data on mount
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
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
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Student List</h2>
      <button onClick={() => navigate('/add')}>➕ Add Student</button>
      <ul>
        {students.map(student => (
          <li key={student.id} style={{ margin: '1rem 0', borderBottom: '1px solid #ccc' }}>
            <strong>{student.name}</strong> — {student.email}
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => navigate(`/student/${student.id}`)}>👁 View</button>
              <button onClick={() => navigate(`/edit/${student.id}`)}>✏️ Edit</button>
              <button onClick={() => handleDelete(student.id)}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;