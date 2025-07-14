import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStudents, deleteStudent } from '../redux/studentSlice';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/student.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not OK');
        return res.json();
      })
      .then((data) => {
        dispatch(setStudents(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) return <div className="text-center mt-4">Loading students...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <div className="container py-4 bg-light min-vh-100">
      <h2 className="text-center mb-2">Student List</h2>
      <p className="text-center text-muted mb-4">
        Total Students: <strong>{students.length}</strong>
      </p>

      <div className="row">
        {students.map((student) => (
          <div key={student.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {student.email}<br />
                  <strong>Phone:</strong> {student.phone}
                </p>
                <div className="d-flex justify-content-between mt-3 flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/student/${student.id}`)}
                    className="btn btn-sm btn-outline-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${student.id}`)}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;