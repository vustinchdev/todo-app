import { LoginParams } from "./../api/authApi.types";
import { BaseResponse } from "common/types";
import { createAppSlice } from "common/utils";
import { authApi } from "../api/authApi";
import { ResultCode } from "common/enums";
import { PayloadAction, isFulfilled } from "@reduxjs/toolkit";

const slice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | BaseResponse;
    }>();
    return {
      login: createAThunk<{ isLoggedIn: boolean }, LoginParams>(
        async (data, { rejectWithValue }) => {
          const res = await authApi.login(data);
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return { isLoggedIn: true };
          } else {
            return rejectWithValue(res.data);
          }
        },
      ),
      logout: createAThunk<{ isLoggedIn: boolean }, undefined>(
        async (_, { rejectWithValue }) => {
          const res = await authApi.logout();
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return { isLoggedIn: false };
          } else {
            return rejectWithValue(res.data);
          }
        },
      ),
      initializeApp: createAThunk<{ isLoggedIn: boolean }, undefined>(
        async (_, { rejectWithValue }) => {
          const res = await authApi.me();
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return { isLoggedIn: true };
          } else {
            return rejectWithValue(res.data);
          }
        },
      ),
    };
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(
        authActions.login,
        authActions.logout,
        authActions.initializeApp,
      ),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;
export type AuthState = ReturnType<typeof slice.getInitialState>;
