import { instance } from "common/api";
import { Todolist, UpdateTodolistTitleArg } from "./todolistsApi.types";
import { BaseResponse } from "common/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists");
  },
  addTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", {
      title,
    });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`);
  },
  updateTodolist(arg: UpdateTodolistTitleArg) {
    return instance.put<BaseResponse>(`todo-lists/${arg.id}`, {
      title: arg.title,
    });
  },
};
