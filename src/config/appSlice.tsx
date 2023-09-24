import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeModeState {
  mode: "dark" | "light";
}

const initialState: ThemeModeState = {
  mode: "dark",
};

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    setThemeMode: (
      state: ThemeModeState,
      action: PayloadAction<"dark" | "light">
    ) => {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
