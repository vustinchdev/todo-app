import { Task } from "features/TodolistsList/api/tasks/tasksApi.types";

type Props = {
  tasks: Task[];
};

export const Tasks = ({ tasks }: Props) => {
  return (
    <ul>
      {tasks.map((t) => {
        return <li key={t.id}>{t.title}</li>;
      })}
    </ul>
  );
};
