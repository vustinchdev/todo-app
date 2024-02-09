import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectTodolists } from "./model/todolists/todolistsSelectors";
import { todolistsThunks } from "./model/todolists/todolistsSlice";
import Paper from "@mui/material/Paper";

export const TodolistsList = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todolistsThunks.setTodolists());
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item style={{ marginTop: "20px" }}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <h2>{tl.title}</h2>
                <input />
                <button>add</button>
                <div>
                  <button>All</button>
                  <button>Completed</button>
                  <button>Active</button>
                </div>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
