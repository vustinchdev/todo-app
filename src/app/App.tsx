import { TodolistsList } from "features/TodolistsList/TodolistsList";
import "./App.css";
import Container from "@mui/material/Container";
import { ButtonAppBar } from "common/components/ButtonAppBar/ButtonAppBar";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { RouterProvider } from "react-router-dom";
import { router } from "common/routes/router";

function App() {
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
