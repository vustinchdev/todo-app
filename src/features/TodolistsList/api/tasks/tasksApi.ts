import { BaseResponse } from "common/types";
import {
  GetTasks,
  TaskResponse,
  UpdateTaskModel,
  AddTaskArgs,
  RemoveTaskArgs,
} from "./tasksApi.types";
import { instance } from "common/api";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasks>(`todo-lists/${todolistId}/tasks`);
  },
  addTask(arg: AddTaskArgs) {
    return instance.post<BaseResponse<{ item: TaskResponse }>>(
      `todo-lists/${arg.todolistId}/tasks`,
      { title: arg.title },
    );
  },
  deleteTask(arg: RemoveTaskArgs) {
    return instance.delete<BaseResponse>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: TaskResponse }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
};
