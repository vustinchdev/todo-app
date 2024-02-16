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
      <Button onClick={() => changeTodolistFilterHandler("all")}>All</Button>
      <Button onClick={() => changeTodolistFilterHandler("completed")}>
        Completed
      </Button>
      <Button onClick={() => changeTodolistFilterHandler("active")}>
        Active
      </Button>
    </div>
  );
};
