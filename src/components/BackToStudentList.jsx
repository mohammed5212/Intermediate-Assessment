import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToStudentList = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/students')}
      style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      ← Back to Student List
    </button>
  );
};

export default BackToStudentList;