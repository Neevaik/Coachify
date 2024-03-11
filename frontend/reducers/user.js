import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id: null,
  name: null,
  gender: null,
  email: null,
  password: null,
  birthdate: null,
  activity: null,
  height: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.password = action.payload.password;
      state.birthdate = action.payload.birthdate;
      state.activity = action.payload.activity;
      state.height = action.payload.height;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
