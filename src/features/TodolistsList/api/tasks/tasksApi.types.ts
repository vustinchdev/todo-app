import { TaskPriorities, TaskStatuses } from "common/enums";

export type TaskResponse = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type GetTasks = {
  items: TaskResponse[];
  totalCount: number;
  error: string | null;
};
export type UpdateTaskModel = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
export type AddTaskArgs = {
  todolistId: string;
  title: string;
};
export type RemoveTaskArgs = {
  todolistId: string;
  taskId: string;
};
