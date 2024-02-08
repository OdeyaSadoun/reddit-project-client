import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    changeUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;
export default userSlice.reducer;
