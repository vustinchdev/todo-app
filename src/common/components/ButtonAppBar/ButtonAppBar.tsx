import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectStatus } from "app/appSlice";
import { authActions, selectIsLoggedIn } from "features/auth/model/authSlice";
import s from "./ButtonAppBar.module.css";

export const ButtonAppBar = () => {
  const status = useAppSelector(selectStatus);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={s.appBar}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress color="info"/>}
      </AppBar>
    </Box>
  );
};
