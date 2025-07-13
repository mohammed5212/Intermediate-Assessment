import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import StudentForm from './components/StudentForm';

const App = () => {
  return (
    <div>
      <Routes>
        {/* Redirect root to /students */}
        <Route path="/" element={<Navigate to="/students" />} />

        {/* Student List Page */}
        <Route path="/students" element={<StudentList />} />

        {/* Student Detail Page */}
        <Route path="/student/:id" element={<StudentDetail />} />

        {/* Add & Edit Form */}
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
      </Routes>
    </div>
  );
};

export default App;