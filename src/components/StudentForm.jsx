import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../redux/studentSlice';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector(state => state.students);

  const isEditMode = Boolean(id);
  const studentToEdit = students.find(s => s.id === parseInt(id));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (isEditMode && studentToEdit) {
      setName(studentToEdit.name);
      setEmail(studentToEdit.email);
      setPhone(studentToEdit.phone);
    }
  }, [id, studentToEdit, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert('All fields are required');
      return;
    }

    const studentData = {
      name,
      email,
      phone
    };

    if (isEditMode) {
      // 🔁 Send PUT to backend
      const res = await fetch(`http://localhost:5000/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...studentData, id: parseInt(id) })
      });

      const updated = await res.json();

      dispatch(updateStudent(updated)); // ✅ Update Redux
    } else {
      // ➕ POST new student
      const res = await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      const newStudent = await res.json();
      dispatch(addStudent(newStudent));
    }

    navigate('/students');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Edit Student' : 'Add Student'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? 'Update' : 'Add'} Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;