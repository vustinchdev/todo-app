import { useEffect } from "react";
import { TodolistDomain } from "../model/todolists/todolistsSlice";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { TaskDomain, tasksActions } from "../model/tasks/tasksSlice";
import { useAppDispatch } from "common/hooks";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import s from "./Todolist.module.css";

type Props = {
  todolist: TodolistDomain;
  tasks: TaskDomain[];
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
    <div className={s.todolist}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCb}
        disabled={todolist.todolistStatus === "loading"}
      />
      <Tasks todolist={todolist} tasks={tasks} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
};
