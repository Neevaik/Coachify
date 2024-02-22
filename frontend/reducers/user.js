import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { email: null , password : null},
};

export const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   updateUser: (state, action) => {
    state.value.email = action.payload;
    state.value.password = action.payload;
},

 },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;