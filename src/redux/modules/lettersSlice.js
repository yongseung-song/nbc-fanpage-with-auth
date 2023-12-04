import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

const initialState = {
  letters: [],
  isEditing: false,
  deleteLetter: {
    isLoading: false,
    isError: false,
  },
  editLetter: {
    isLoading: false,
    isError: false,
  },
  fetchLetters: {
    isLoading: false,
    isError: false,
  },
  error: '',
};

export const __addLetter = createAsyncThunk(
  'letterAdded',
  async (
    { id, createdAt, nickname, content, writedTo, avatar, userId },
    ThunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_JSON_SERVER_URL}/letters`,
        {
          id,
          nickname,
          content,
          avatar,
          writedTo,
          createdAt,
          userId,
        }
      );
      return ThunkAPI.fulfillWithValue(response);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

const __deleteLetter = createAsyncThunk(
  'letterDeleted',
  async ({ selectedId }, ThunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_JSON_SERVER_URL}/letters?id=${selectedId}`
      );

      return ThunkAPI.fulfillWithValue(response);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

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
  extraReducers: {
    [__addLetter.pending]: (state, action) => {
      state.addLetter.isLoading = true;
      state.addLetter.isError = false;
      // BUG 아마도 인터셉터의 영역인 것 같다
      // toast.loading('팬레터를 보내는 중입니다...');
    },
    [__addLetter.fulfilled]: (state, action) => {
      state.addLetter.isLoading = false;
      state.addLetter.isError = false;
      console.log(action.payload.statusText);
    },
    [__addLetter.rejected]: (state, action) => {
      state.addLetter.isLoading = false;
      state.addLetter.isError = true;
      console.log(action.payload.statusText);
      console.error(action.payload.status);
    },
    [__deleteLetter.pending]: (state, action) => {
      state.deleteLetter.isLoading = true;
      state.deleteLetter.isError = false;
    },
    [__deleteLetter.fulfilled]: (state, action) => {
      state.deleteLetter.isLoading = false;
      state.deleteLetter.isError = false;
      console.log(action.payload.statusText);
    },
    [__deleteLetter.rejected]: (state, action) => {
      state.deleteLetter.isLoading = false;
      state.deleteLetter.isError = true;
      console.log(action.payload.statusText);
      console.error(action.payload.status);
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
