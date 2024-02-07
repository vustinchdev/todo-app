import { BaseResponse } from "common/types";
import { GetTasks, Task, UpdateTaskModel } from "./tasksApi.types";
import { instance } from "common/api";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasks>(`todo-lists/${todolistId}/tasks`);
  },
  addTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: Task }>>(
      `todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  delete(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: Task }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
};
