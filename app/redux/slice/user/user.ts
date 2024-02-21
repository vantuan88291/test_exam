import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SLICES } from "@utils";
import { UserReducer } from "./types";

const initialState: UserReducer = {
  username: "",
  password: "",
};

const slice = createSlice({
  name: SLICES.user,
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    changePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { changeUsername, changePassword, clearUser } = slice.actions;

export const UserSlice = slice.reducer;
