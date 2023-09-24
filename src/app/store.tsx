import { configureStore } from "@reduxjs/toolkit";
import themeModeReducer from "../config/appSlice";

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
