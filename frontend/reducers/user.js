import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  password: null,
  name:null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
