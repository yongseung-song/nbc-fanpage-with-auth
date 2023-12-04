import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const initialState = {
  letters: [],
  isEditing: false,
  fetchLetters: {
    isLoading: false,
    isError: false,
  },
  addLetter: {
    isLoading: false,
    isError: false,
  },
  editLetter: {
    isLoading: false,
    isError: false,
  },
  deleteLetter: {
    isLoading: false,
    isError: false,
  },
  error: '',
};

export const __fetchLetters = createAsyncThunk(
  'fetchLetter',
  async (payload, ThunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_JSON_SERVER_URL}/letters?_sort=views&_order=desc`
      );
      return ThunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetter = createAsyncThunk(
  'addLetter',
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

export const __deleteLetter = createAsyncThunk(
  'deleteLetter',
  async ({ selectedId }, ThunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_JSON_SERVER_URL}/letters/${selectedId}`
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
    [__fetchLetters.pending]: (state, action) => {
      state.fetchLetters.isLoading = true;
      state.fetchLetters.isError = false;
    },
    [__fetchLetters.fulfilled]: (state, action) => {
      state.fetchLetters.isLoading = false;
      state.fetchLetters.isError = false;
      state.letters = action.payload;
    },
    [__fetchLetters.rejected]: (state, action) => {
      state.fetchLetters.isLoading = false;
      state.fetchLetters.isError = true;
      state.error = action.payload;
    },
    [__addLetter.pending]: (state, action) => {
      state.addLetter.isLoading = true;
      state.addLetter.isError = false;
      toast.loading('팬레터를 보내는 중입니다...');
    },
    [__addLetter.fulfilled]: (state, action) => {
      state.addLetter.isLoading = false;
      state.addLetter.isError = false;
      state.letters = [action.payload, ...state.letters];
    },
    [__addLetter.rejected]: (state, action) => {
      state.addLetter.isLoading = false;
      state.addLetter.isError = true;
      state.error = action.payload.status;
    },
    [__deleteLetter.pending]: (state, action) => {
      state.deleteLetter.isLoading = true;
      state.deleteLetter.isError = false;
    },
    [__deleteLetter.fulfilled]: (state, action) => {
      state.deleteLetter.isLoading = false;
      state.deleteLetter.isError = false;
    },
    [__deleteLetter.rejected]: (state, action) => {
      state.deleteLetter.isLoading = false;
      state.deleteLetter.isError = true;
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
