
import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    setStudents: (state, action) => action.payload,
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      return state.filter(s => s.id !== action.payload);
    }
  }
});

// ✅ Make sure all reducers are exported here:
export const {
  setStudents,
  addStudent,
  updateStudent,  // <-- this line is very important
  deleteStudent
} = studentSlice.actions;

export default studentSlice.reducer;