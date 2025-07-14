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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('/student.json') // static file from public/
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch student data');
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

  const filtered = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Student List</h2>

      {/* Search & Sort */}
      <div className="row g-2 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-md-end">
          <button
            onClick={() => setSortOrder('asc')}
            className={`btn btn-sm me-2 ${sortOrder === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            A-Z
          </button>
          <button
            onClick={() => setSortOrder('desc')}
            className={`btn btn-sm ${sortOrder === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            Z-A
          </button>
        </div>
      </div>

      {/* Student Grid */}
      <div className="row">
        {sorted.length === 0 ? (
          <div className="text-center text-muted">No students found.</div>
        ) : (
          sorted.map((student) => (
            <div key={student.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{student.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {student.email}<br />
                    <strong>Phone:</strong> {student.phone}
                  </p>
                  <div className="d-flex justify-content-between mt-3">
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
          ))
        )}
      </div>
    </div>
  );
};

export default StudentList;
