import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  userId: '',
  avatar: '',
  nickname: '',
  message: '',
  accessToken: '',
  isValidToken: false,
  error: null,

  getUser: {
    isLoading: false,
    isError: false,
  },
  signUp: {
    isLoading: false,
    isError: false,
  },
  signIn: {
    isLoading: false,
    isError: false,
  },

  signUpLoading: false,
  signUpError: null,

  signInLoading: false,
  signInError: null,
};

export const __signUp = createAsyncThunk(
  'signUp',
  async ({ id, password, nickname }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_JWT_URL}/register`,
        {
          id,
          password,
          nickname,
        }
      );
      console.log('response', response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response?.data.message,
        error: error.response?.request.status,
      });
    }
  }
);

export const __signIn = createAsyncThunk(
  'signIn',
  async ({ id, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_JWT_URL}/login?expiresIn=2m`,
        {
          id,
          password,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response?.data.message,
        error: error.response?.request.status,
      });
    }
  }
);

export const __getUser = createAsyncThunk(
  'getUser',
  async (accessToken, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_JWT_URL}/user`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: error.response?.data.message,
        error: error.response?.request.status,
      });
    }
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
      state.signUp.isLoading = true;
      state.signUp.isError = false;
    },
    [__signUp.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.signUp.isLoading = false;
      state.signUp.isError = false;
      toast.success('회원가입 성공!');
    },
    [__signUp.rejected]: (state, action) => {
      state.success = false;
      state.signUp.isLoading = false;
      state.signUp.isError = true;
      state.error = action.payload.error;
      toast.error(action.payload.errorMessage);
    },
    [__signIn.pending]: (state, action) => {
      state.signIn.isLoading = true;
      state.signIn.isError = false;
    },
    [__signIn.fulfilled]: (state, action) => {
      const { userId, nickname, accessToken } = action.payload;
      // localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('accessToken', accessToken);
      state.success = action.payload.success;
      state.userId = userId;
      state.nickname = nickname;
      state.isLoggedIn = true;
      state.signIn.isLoading = false;
      state.signIn.isError = false;
      toast.success('로그인 성공');
    },
    [__signIn.rejected]: (state, action) => {
      state.success = false;
      state.signIn.isLoading = false;
      state.signIn.isError = true;
      state.error = action.payload.error;
      toast.error(action.payload.errorMessage);
    },
    [__getUser.pending]: (state, action) => {
      state.getUser.isLoading = true;
      state.getUser.isError = false;
    },
    [__getUser.fulfilled]: (state, action) => {
      const { id: userId, nickname, avatar, success } = action.payload;
      state.isLoggedIn = true;
      state.getUser.isLoading = false;
      state.getUser.isError = false;
      state.userId = userId;
      state.nickname = nickname;
      state.avatar = avatar;
      state.success = success;
      // toast.success('유저 정보 불러오기');
    },
    [__getUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.success = false;
      state.getUser.isLoading = false;
      state.getUser.isError = true;
      state.error = action.payload.error;
      state.isValidToken = false;
      localStorage.removeItem('accessToken');
      toast.error(action.payload.errorMessage);
    },
  },
});

export default authSlice.reducer;
export const { setIsLoggedIn } = authSlice.actions;
