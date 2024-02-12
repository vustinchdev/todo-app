import { TodolistDomain } from "../model/todolists/todolistsSlice";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomain;
};

export const Todolist = ({ todolist }: Props) => {
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <input />
      <button>add</button>
      <div>
        <button>All</button>
        <button>Completed</button>
        <button>Active</button>
      </div>
    </div>
  );
};
