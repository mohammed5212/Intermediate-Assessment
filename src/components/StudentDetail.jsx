import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = useSelector((state) =>
    state.students.find((s) => s.id === parseInt(id))
  );

  if (!student) {
    return (
      <div className="container mt-5 text-center text-danger bg-light p-4 rounded">
        <h4>❌ Student not found</h4>
        <button className="btn btn-secondary mt-4" onClick={() => navigate('/students')}>
          ← Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm bg-info bg-opacity-10">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Student Details</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent">
                  <strong>Name:</strong> {student.name}
                </li>
                <li className="list-group-item bg-transparent">
                  <strong>Email:</strong> {student.email}
                </li>
                <li className="list-group-item bg-transparent">
                  <strong>Phone:</strong> {student.phone}
                </li>
              </ul>
              <div className="d-grid mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/students')}
                >
                  ← Back to Student List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;