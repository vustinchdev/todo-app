import { TodolistsList } from "features/TodolistsList/TodolistsList";
import "./App.css";
import Container from "@mui/material/Container";
import { ButtonAppBar } from "common/components/ButtonAppBar/ButtonAppBar";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";

function App() {
  return (
    <div>
      <ErrorSnackbar />
      <ButtonAppBar />
      <Container>
        <TodolistsList />
      </Container>
    </div>
  );
}

export default App;
