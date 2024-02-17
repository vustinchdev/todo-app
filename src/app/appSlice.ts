import {
  PayloadAction,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { createAppSlice } from "common/utils";

const slice = createAppSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
  },
  selectors: {
    selectStatus: (state) => state.status,
  },
  reducers: (creators) => {
    return {
      changeAppStatus: creators.reducer(
        (state, action: PayloadAction<{ status: RequestStatus }>) => {
          state.status = action.payload.status;
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
      .addMatcher(isRejected, (state) => {
        state.status = "failed";
      });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const { selectStatus } = slice.selectors;

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
