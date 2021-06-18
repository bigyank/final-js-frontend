import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme") || "light",
  },

  reducers: {
    toggle: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
