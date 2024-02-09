import { TodolistsList } from "features/TodolistsList/TodolistsList";
import "./App.css";
import Container from "@mui/material/Container";

function App() {
  return (
    <div>
      <Container>
        <TodolistsList />
      </Container>
    </div>
  );
}

export default App;
