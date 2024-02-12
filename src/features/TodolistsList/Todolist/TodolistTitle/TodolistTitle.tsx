import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "common/hooks";
import {
  TodolistDomain,
  todolistsThunks,
} from "features/TodolistsList/model/todolists/todolistsSlice";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  todolist: TodolistDomain;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const changeTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ id: todolist.id, title }));
  };
  const removeTodolistHandler = () => {
    dispatch(todolistsThunks.deleteTodolist(todolist.id));
  };

  return (
    <h3>
      <EditableSpan
        titleValue={todolist.title}
        onChange={changeTodolistTitle}
      />
      <IconButton aria-label="delete" onClick={removeTodolistHandler}>
        <ClearIcon />
      </IconButton>
    </h3>
  );
};
