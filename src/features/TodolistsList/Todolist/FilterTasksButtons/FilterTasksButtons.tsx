import Button from "@mui/material/Button";
import { useAppDispatch } from "common/hooks";
import {
  FilterValues,
  TodolistDomain,
  todolistsActions,
} from "features/TodolistsList/model/todolists/todolistsSlice";

type Props = {
  todolist: TodolistDomain;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const changeTodolistFilterHandler = (filter: FilterValues) => {
    dispatch(
      todolistsActions.changeTodolistFilter({ id: todolist.id, filter }),
    );
  };
  return (
    <div>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "contained"}
        color="success"
        onClick={() => changeTodolistFilterHandler("all")}
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "contained"}
        color="primary"
        onClick={() => changeTodolistFilterHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "contained"}
        color="error"
        onClick={() => changeTodolistFilterHandler("completed")}
      >
        Completed
      </Button>
    </div>
  );
};
