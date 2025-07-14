import { Routes, Route, Navigate, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import StudentForm from './components/StudentForm';
import './style/App.css';

const App = () => {
  return (
    <div>
      {/* Optional Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/students" className="navbar-brand">Student Portal</Link>
          <div>
            <Link to="/add" className="btn btn-sm btn-outline-light me-2">Add Student</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/students" />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetail />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;