import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  selectTodolists,
  todolistsActions,
} from "./model/todolists/todolistsSlice";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";

export const TodolistsList = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todolistsActions.setTodolists());
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item style={{ marginTop: "20px" }}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
