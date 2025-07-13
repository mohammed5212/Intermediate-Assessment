import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import StudentForm from './components/StudentForm';
import './style/App.css';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/add" element={<StudentForm />} />
        <Route path="/edit/:id" element={<StudentForm />} />
      </Routes>
    </div>
  );
};

export default App;