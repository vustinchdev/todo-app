import { TodolistsList } from "features/TodolistsList/TodolistsList";
import "./App.css";
import Container from "@mui/material/Container";
import { ButtonAppBar } from "common/components/ButtonAppBar/ButtonAppBar";

function App() {
  return (
    <div>
      <ButtonAppBar />
      <Container>
        <TodolistsList />
      </Container>
    </div>
  );
}

export default App;
