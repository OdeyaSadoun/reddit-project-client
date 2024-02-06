import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any; // You can replace 'any' with the actual type of your user object
}

const initValue: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initValue,

  reducers: {
    changeUser: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;
