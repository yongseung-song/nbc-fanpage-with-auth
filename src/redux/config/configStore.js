import { configureStore } from '@reduxjs/toolkit';
import letters from 'redux/modules/letters';
import members from 'redux/modules/members';

const store = configureStore({
  reducer: {
    letters,
    members,
  },
});
export default store;
