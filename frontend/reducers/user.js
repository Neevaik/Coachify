import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  password: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
