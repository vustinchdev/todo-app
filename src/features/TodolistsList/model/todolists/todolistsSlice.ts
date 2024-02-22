import { PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "app/appSlice";
import { ResultCode } from "common/enums";
import { BaseResponse } from "common/types";
import { createAppSlice } from "common/utils";
import { todolistsApi } from "features/TodolistsList/api/todolists/todolistsApi";
import {
  Todolist,
  UpdateTodolistTitleArg,
} from "features/TodolistsList/api/todolists/todolistsApi.types";
import { authActions } from "features/auth/model/authSlice";

const slice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistDomain[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | BaseResponse;
    }>();
    return {
      changeTodolistFilter: creators.reducer(
        (
          state,
          action: PayloadAction<{ id: string; filter: FilterValues }>,
        ) => {
          const todolist = state.find((todo) => todo.id === action.payload.id);
          if (todolist) {
            todolist.filter = action.payload.filter;
          }
        },
      ),
      setTodolists: createAThunk<{ todolists: Todolist[] }, undefined>(
        async () => {
          const res = await todolistsApi.getTodolists();
          return { todolists: res.data };
        },
        {
          fulfilled: (state, action) => {
            action.payload.todolists.forEach((tl) => {
              state.push({ ...tl, filter: "all", todolistStatus: "idle" });
            });
          },
        },
      ),
      addTodolist: createAThunk<{ todolist: Todolist }, string>(
        async (title, { rejectWithValue }) => {
          const res = await todolistsApi.addTodolist(title);
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return { todolist: res.data.data.item };
          } else {
            return rejectWithValue(res.data);
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({
              ...action.payload.todolist,
              filter: "all",
              todolistStatus: "idle",
            });
          },
        },
      ),
      deleteTodolist: createAThunk<{ id: string }, string>(
        async (id, { rejectWithValue }) => {
          const res = await todolistsApi.deleteTodolist(id);
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return { id };
          } else {
            return rejectWithValue(res.data);
          }
        },
        {
          pending: (state, action) => {
            const todolist = state.find((todo) => todo.id === action.meta.arg);
            if (todolist) {
              todolist.todolistStatus = "loading";
            }
          },
          fulfilled: (state, action) => {
            const index = state.findIndex(
              (todo) => todo.id === action.payload.id,
            );
            if (index !== -1) {
              state[index].todolistStatus = "succeeded";
              state.splice(index, 1);
            }
          },
          rejected: (state, action) => {
            const todolist = state.find((todo) => todo.id === action.meta.arg);
            if (todolist) {
              todolist.todolistStatus = "failed";
            }
          },
        },
      ),
      changeTodolistTitle: createAThunk<
        UpdateTodolistTitleArg,
        UpdateTodolistTitleArg
      >(
        async (arg, { rejectWithValue }) => {
          const res = await todolistsApi.updateTodolist(arg);
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return arg;
          } else {
            return rejectWithValue(res.data);
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex(
              (todo) => todo.id === action.payload.id,
            );
            if (index !== -1) {
              state[index].title = action.payload.title;
            }
          },
        },
      ),
    };
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.logout.fulfilled, () => {
      return [];
    });
  },
});

export type TodolistDomain = Todolist & {
  filter: FilterValues;
  todolistStatus: RequestStatus;
};
export type FilterValues = "all" | "completed" | "active";

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const { selectTodolists } = slice.selectors;
