import { TodolistDomain } from "../model/todolists/todolistsSlice";

type Props = {
  todolist: TodolistDomain;
};

export const Todolist = ({ todolist }: Props) => {
  return (
    <div>
      <h2>{todolist.title}</h2>
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
