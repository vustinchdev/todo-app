import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { Login } from "features/auth/ui/Login";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodolistsList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/404",
    element: <h1>404: PAGE NOT FOUND</h1>,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
]);
