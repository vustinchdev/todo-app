import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  selectTodolists,
  todolistsActions,
} from "./model/todolists/todolistsSlice";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";
import { selectTasks } from "./model/tasks/tasksSlice";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { selectIsLoggedIn } from "features/auth/model/authSlice";
import { Navigate } from "react-router-dom";
import s from "./TodolistList.module.css";

export const TodolistsList = () => {
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(todolistsActions.setTodolists());
  }, []);

  const addTodolist = (title: string) => {
    return dispatch(todolistsActions.addTodolist(title)).unwrap();
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={s.todolistList}>
      <Grid container className={s.addItem}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item style={{ marginTop: "20px" }}>
              <Paper
                elevation={3}
                style={{ padding: "20px" }}
                className={s.paper}
              >
                <Todolist todolist={tl} tasks={tasks[tl.id]} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
