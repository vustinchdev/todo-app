import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "features/TodolistsList/model/todolists/todolistsSlice";

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
