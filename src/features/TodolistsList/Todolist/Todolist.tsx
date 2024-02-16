import { useEffect } from "react";
import { TaskResponse } from "../api/tasks/tasksApi.types";
import { TodolistDomain } from "../model/todolists/todolistsSlice";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { tasksActions } from "../model/tasks/tasksSlice";
import { useAppDispatch } from "common/hooks";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";

type Props = {
  todolist: TodolistDomain;
  tasks: TaskResponse[];
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
      <Tasks todolist={todolist} tasks={tasks} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
