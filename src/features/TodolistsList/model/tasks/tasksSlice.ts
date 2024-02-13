import { AppRootState } from "app/store";
import { ResultCode } from "common/enums";
import { BaseResponse } from "common/types";
import { createAppSlice } from "common/utils";
import { tasksApi } from "features/TodolistsList/api/tasks/tasksApi";
import {
  AddTaskArgs,
  RemoveTaskArgs,
  Task,
  UpdateTaskModel,
} from "features/TodolistsList/api/tasks/tasksApi.types";
import { todolistsActions } from "../todolists/todolistsSlice";

const slice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{
      rejectValue: null | BaseResponse;
    }>();
    return {
      setTasks: createAThunk<{ todolistId: string; tasks: Task[] }, string>(
        async (todolistId, _) => {
          const res = await tasksApi.getTasks(todolistId);
          return { todolistId, tasks: res.data.items };
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks;
          },
        },
      ),
      addTask: createAThunk<{ todolistId: string; task: Task }, AddTaskArgs>(
        async (arg, { rejectWithValue }) => {
          const res = await tasksApi.addTask(arg);
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return { todolistId: arg.todolistId, task: res.data.data.item };
          } else {
            return rejectWithValue(res.data);
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId];
            tasks.unshift(action.payload.task);
          },
        },
      ),
      deleteTask: createAThunk<RemoveTaskArgs, RemoveTaskArgs>(
        async (arg, { rejectWithValue }) => {
          const res = await tasksApi.deleteTask(arg);
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return { todolistId: arg.todolistId, taskId: arg.taskId };
          } else {
            return rejectWithValue(res.data);
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(
              (todo) => todo.id === action.payload.taskId,
            );
            if (index !== -1) {
              tasks.splice(index, 1);
            }
          },
        },
      ),
      UpdateTask: createAThunk<UpdateTaskArg, UpdateTaskArg>(
        async (arg, { rejectWithValue, getState }) => {
          const state = getState() as AppRootState;
          const task = state.tasks[arg.todolistId].find(
            (t) => t.id === arg.taskId,
          );
          if (!task) {
            return rejectWithValue(null);
          }
          const apiModel: UpdateTaskModel = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...arg.domainModel,
          };
          const res = await tasksApi.updateTask(
            arg.todolistId,
            arg.taskId,
            apiModel,
          );
          if (res.data.resultCode === ResultCode.SUCCEEDED) {
            return arg;
          } else {
            return rejectWithValue(res.data);
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(
              (todo) => todo.id === action.payload.taskId,
            );
            if (index !== -1) {
              tasks[index] = { ...tasks[index], ...action.payload.domainModel };
            }
          },
        },
      ),
    };
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.setTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todolistsActions.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export type TasksState = Record<string, Task[]>;
export type UpdateDomainTaskModel = Partial<UpdateTaskModel>;
type UpdateTaskArg = {
  todolistId: string;
  taskId: string;
  domainModel: UpdateDomainTaskModel;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const { selectTasks } = slice.selectors;
