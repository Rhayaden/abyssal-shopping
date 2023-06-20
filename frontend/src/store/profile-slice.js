import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isInfo: false,
    isChangePass: false,
    isInbox: false,
    isExpired: false,
  },
  reducers: {
    openInfo(state) {
      state.isInfo = true;
    },
    openChangePass(state) {
      state.isChangePass = true;
    },
    openInbox(state) {
      state.isInbox = true;
    },
    close(state) {
      state.isInfo = false;
      state.isChangePass = false;
      state.isInbox = false;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice;
