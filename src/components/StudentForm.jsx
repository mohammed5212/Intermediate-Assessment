import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, editStudent } from '../redux/studentSlice';

const StudentForm = () => {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector(state => state.students);

  const isEditing = !!id;
  const existingStudent = isEditing
    ? students.find(s => s.id === Number(id))
    : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form if editing
  useEffect(() => {
    if (existingStudent) {
      setFormData({
        name: existingStudent.name || '',
        email: existingStudent.email || '',
        phone: existingStudent.phone || '',
      });
    }
  }, [existingStudent]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      dispatch(editStudent({ id: Number(id), ...formData }));
    } else {
      const newStudent = {
        id: Date.now(), // unique ID
        ...formData,
      };
      dispatch(addStudent(newStudent));
    }

    navigate('/students');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Phone:</label><br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>

        <br />
        <button type="submit">
          {isEditing ? 'Update' : 'Add'} Student
        </button>{' '}
        <button type="button" onClick={() => navigate('/students')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StudentForm;