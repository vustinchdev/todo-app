import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "common/hooks";
import {
  TodolistDomain,
  todolistsActions,
} from "features/TodolistsList/model/todolists/todolistsSlice";
import s from "./TodolistTitle.module.css";

type Props = {
  todolist: TodolistDomain;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const changeTodolistTitle = (title: string) => {
    dispatch(todolistsActions.changeTodolistTitle({ id: todolist.id, title }));
  };

  return (
    <h3 className={s.title}>
      <EditableSpan
        titleValue={todolist.title}
        onChange={changeTodolistTitle}
        disabled={todolist.todolistStatus === "loading"}
      />
    </h3>
  );
};
