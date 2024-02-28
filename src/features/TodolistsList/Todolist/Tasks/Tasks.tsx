import { Task } from "./Task/Task";
import { TodolistDomain } from "features/TodolistsList/model/todolists/todolistsSlice";
import { TaskStatuses } from "common/enums";
import { TaskDomain } from "features/TodolistsList/model/tasks/tasksSlice";


type Props = {
  tasks: TaskDomain[];
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
        return (
          <Task
            key={t.id}
            todolistId={todolist.id}
            task={t}
            disabled={t.taskStatus === "loading"}
          />
        );
      })}
    </ul>
  );
};
