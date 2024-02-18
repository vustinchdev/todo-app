import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { appActions, selectError } from "app/appSlice";

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppError({ error: null }));
  };

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
