import {
  PayloadAction,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { createAppSlice } from "common/utils";
import { tasksActions } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsActions } from "features/TodolistsList/model/todolists/todolistsSlice";
import { authActions } from "features/auth/model/authSlice";

const slice = createAppSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
    error: null as null | string,
    isInitialized: false,
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsInitialized: (state) => state.isInitialized,
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
      })
      .addMatcher(
        isAnyOf(
          authActions.initializeApp.fulfilled,
          authActions.initializeApp.rejected,
        ),
        (state) => {
          state.isInitialized = true;
        },
      );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const { selectStatus, selectError, selectIsInitialized } =
  slice.selectors;
export type AppState = ReturnType<typeof slice.getInitialState>;

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
