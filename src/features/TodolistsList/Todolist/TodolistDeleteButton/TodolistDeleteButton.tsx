import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {
  TodolistDomain,
  todolistsActions,
} from "features/TodolistsList/model/todolists/todolistsSlice";
import { useAppDispatch } from "common/hooks";
import s from "./TodolistDeleteButton.module.css";

type Props = {
  todolist: TodolistDomain;
};

export const TodolistDeleteButton = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const removeTodolistHandler = () => {
    dispatch(todolistsActions.deleteTodolist(todolist.id));
  };
  return (
    <div className={s.deleteBtn}>
      <IconButton
        aria-label="delete"
        onClick={removeTodolistHandler}
        disabled={todolist.todolistStatus === "loading"}
      >
        <ClearIcon />
      </IconButton>
    </div>
  );
};
