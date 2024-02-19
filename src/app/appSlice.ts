import {
  PayloadAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { createAppSlice } from "common/utils";
import { tasksActions } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsActions } from "features/TodolistsList/model/todolists/todolistsSlice";

const slice = createAppSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
    error: null as null | string,
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
  reducers: (creators) => {
    return {
      changeAppStatus: creators.reducer(
        (state, action: PayloadAction<{ status: RequestStatus }>) => {
          state.status = action.payload.status;
        },
      ),
      setAppError: creators.reducer(
        (state, action: PayloadAction<{ error: null | string }>) => {
          state.error = action.payload.error;
        },
      ),
    };
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed";
        if (action.payload) {
          if (
            action.type === todolistsActions.addTodolist.rejected.type ||
            action.type === tasksActions.addTask.rejected.type
          ) {
            return;
          }
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message
            ? action.error.message
            : "Some error occurred";
        }
      });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const { selectStatus, selectError } = slice.selectors;
export type AppState = ReturnType<typeof slice.getInitialState>;

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
