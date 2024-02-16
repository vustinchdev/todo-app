import { TaskResponse } from "features/TodolistsList/api/tasks/tasksApi.types";
import { Todolist } from "features/TodolistsList/api/todolists/todolistsApi.types";
import { Task } from "./Task/Task";

type Props = {
  tasks: TaskResponse[];
  todolist: Todolist;
};

export const Tasks = ({ todolist, tasks }: Props) => {
  return (
    <ul>
      {tasks.map((t) => {
        return <Task key={t.id} todolistId={todolist.id} task={t} />;
      })}
    </ul>
  );
};
