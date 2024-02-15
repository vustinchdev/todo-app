import { useEffect } from "react";
import { Task } from "../api/tasks/tasksApi.types";
import { TodolistDomain } from "../model/todolists/todolistsSlice";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { tasksActions } from "../model/tasks/tasksSlice";
import { useAppDispatch } from "common/hooks";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";

type Props = {
  todolist: TodolistDomain;
  tasks: Task[];
};

export const Todolist = ({ todolist, tasks }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksActions.setTasks(todolist.id));
  }, []);

  const addTaskCb = (title: string) => {
    return dispatch(
      tasksActions.addTask({ todolistId: todolist.id, title }),
    ).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCb} />
      <Tasks tasks={tasks} />
      <div>
        <button>All</button>
        <button>Completed</button>
        <button>Active</button>
      </div>
    </div>
  );
};
