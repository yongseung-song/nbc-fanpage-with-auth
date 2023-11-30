import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: ['신재평', '이장원'],
  selectedMember: '신재평',
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    },
  },
});

export default membersSlice.reducer;
export const { setSelectedMember } = membersSlice.actions;
