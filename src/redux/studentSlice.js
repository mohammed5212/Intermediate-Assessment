import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    setStudents: (state, action) => {
      return action.payload; // Replace the entire student list
    },
    addStudent: (state, action) => {
      state.push(action.payload); // Add new student
    },
    editStudent: (state, action) => {
      const index = state.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Replace existing student
      }
    },
    deleteStudent: (state, action) => {
      return state.filter(student => student.id !== action.payload);
    },
  },
});

export const { setStudents, addStudent, editStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;