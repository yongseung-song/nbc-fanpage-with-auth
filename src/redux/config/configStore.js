import { configureStore } from '@reduxjs/toolkit';
import auth from 'redux/modules/authSlice';
import letters from 'redux/modules/lettersSlice';
import members from 'redux/modules/membersSlice';

const store = configureStore({
  reducer: {
    letters,
    members,
    auth,
  },
});
export default store;
