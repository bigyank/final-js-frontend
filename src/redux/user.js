import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") || null,
  },

  reducers: {
    auth: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      state.isAuth = true;
      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.user = {};
      state.toke = null;
      state.isAuth = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
    },
  },
});

// Action creators are generated for each case reducer function
export const { auth, logout } = userSlice.actions;

export default userSlice.reducer;
