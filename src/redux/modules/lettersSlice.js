import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  letters: [],
  isEditing: false,
};

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    letterSet: (state, action) => {
      state.letters = [...action.payload];
    },
    letterAdded: (state, action) => {
      state.letters.push(action.payload);
    },
    letterDeleted: (state, action) => {
      return state.letters.filter((letter) => letter.id !== action.payload);
    },
    letterEdited: (state, action) => {
      const { selectedId, textAreaValue: editedContent } = action.payload;
      const letterEdited = state.letters.find(
        (letter) => letter.id === selectedId
      );
      if (letterEdited) {
        letterEdited.content = editedContent;
        letterEdited.editedAt = dayjs().toJSON();
      }
    },
    isEditMode: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

export default lettersSlice.reducer;
export const {
  letterSet,
  letterAdded,
  letterDeleted,
  letterEdited,
  isEditMode,
} = lettersSlice.actions;
