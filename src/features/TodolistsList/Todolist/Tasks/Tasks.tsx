import { TaskResponse } from "features/TodolistsList/api/tasks/tasksApi.types";
import { Task } from "./Task/Task";
import { TodolistDomain } from "features/TodolistsList/model/todolists/todolistsSlice";
import { TaskStatuses } from "common/enums";

type Props = {
  tasks: TaskResponse[];
  todolist: TodolistDomain;
};

export const Tasks = ({ todolist, tasks }: Props) => {
  let tasksForTodolist = tasks;
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter(
      (t) => t.status === TaskStatuses.Completed,
    );
  }
  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(
      (t) => t.status === TaskStatuses.New,
    );
  }
  return (
    <ul>
      {tasksForTodolist.map((t) => {
        return <Task key={t.id} todolistId={todolist.id} task={t} />;
      })}
    </ul>
  );
};
