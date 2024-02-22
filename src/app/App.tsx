import "./App.css";
import Container from "@mui/material/Container";
import { ButtonAppBar } from "common/components/ButtonAppBar/ButtonAppBar";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { RouterProvider } from "react-router-dom";
import { router } from "common/routes/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { authActions } from "features/auth/model/authSlice";
import { selectIsInitialized } from "./appSlice";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    dispatch(authActions.initializeApp());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "40%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ErrorSnackbar />
      <ButtonAppBar />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
