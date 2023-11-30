import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  accessToken: '',
  userId: '',
  success: false,
  avatar: '',
  nickname: '',
  message: '',
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const __signUp = createAsyncThunk(
  'signUp',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_JWT_URL}/register`,
        {
          id: payload.idValue,
          password: payload.passwordValue,
          nickname: payload.nicknameValue,
        }
      );
      console.log('response', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __signIn = createAsyncThunk(
  'signIn',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post();
    } catch (error) {}
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: {
    [__signUp.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__signUp.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      console.log(action.payload.message);
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isError = false;
      toast.success('on slice');
    },
    [__signUp.rejected]: (state, action) => {
      state.success = false;
      state.isLoading = false;
      // 임시방편
      console.log(action.payload.message);
      state.isLoggedIn = false;
      state.isError = true;
      state.error = action.payload.error;
    },
  },
});

export default authSlice.reducer;
export const { setIsLoggedIn } = authSlice.actions;
