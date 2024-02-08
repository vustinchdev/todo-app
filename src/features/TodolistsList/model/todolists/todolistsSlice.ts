import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResultCode } from "common/enums";
import { createAppAsyncThunk } from "common/utils";
import { todolistsApi } from "features/TodolistsList/api/todolists/todolistsApi";
import {
  Todolist,
  UpdateTodolistTitleArg,
} from "features/TodolistsList/api/todolists/todolistsApi.types";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomain[],
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValues }>,
    ) => {
      const todolist = state.find((todo) => todo.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all" });
        });
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all" });
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      });
  },
});

const setTodolists = createAppAsyncThunk<{ todolists: Todolist[] }, void>(
  `${slice.name}/setTodolists`,
  async () => {
    const res = await todolistsApi.getTodolists();
    return { todolists: res.data };
  },
);
const addTodolist = createAppAsyncThunk<{ todolist: Todolist }, string>(
  `${slice.name}/addTodolist`,
  async (title, { rejectWithValue }) => {
    const res = await todolistsApi.addTodolist(title);
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      return { todolist: res.data.data.item };
    } else {
      return rejectWithValue(res.data);
    }
  },
);
const deleteTodolist = createAppAsyncThunk<{ id: string }, string>(
  `${slice.name}/deleteTodolist`,
  async (id, { rejectWithValue }) => {
    const res = await todolistsApi.deleteTodolist(id);
    if (res.data.resultCode === ResultCode.SUCCEEDED) {
      return { id };
    } else {
      return rejectWithValue(res.data);
    }
  },
);
const changeTodolistTitle = createAppAsyncThunk<
  UpdateTodolistTitleArg,
  UpdateTodolistTitleArg
>(`${slice.name}/changeTodolistTitle`, async (arg, { rejectWithValue }) => {
  const res = await todolistsApi.updateTodolist(arg);
  if (res.data.resultCode === ResultCode.SUCCEEDED) {
    return arg;
  } else {
    return rejectWithValue(res.data);
  }
});

export type TodolistDomain = Todolist & {
  filter: FilterValues;
};
export type FilterValues = "all" | "completed" | "active";

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {
  setTodolists,
  addTodolist,
  deleteTodolist,
  changeTodolistTitle,
};
