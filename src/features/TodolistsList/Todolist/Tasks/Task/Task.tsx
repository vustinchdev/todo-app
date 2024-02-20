import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "common/hooks";
import { TaskResponse } from "features/TodolistsList/api/tasks/tasksApi.types";
import { tasksActions } from "features/TodolistsList/model/tasks/tasksSlice";
import IconButton from "@mui/material/IconButton";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent } from "react";
import { TaskStatuses } from "common/enums";

type Props = {
  todolistId: string;
  task: TaskResponse;
  disabled: boolean;
};

export const Task = ({ todolistId, task, disabled }: Props) => {
  const dispatch = useAppDispatch();

  const onChangeTaskHandler = (title: string) => {
    dispatch(
      tasksActions.updateTask({
        todolistId,
        taskId: task.id,
        domainModel: { title },
      }),
    );
  };
  const deleteTaskHandler = () => {
    dispatch(tasksActions.deleteTask({ todolistId, taskId: task.id }));
  };
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    dispatch(
      tasksActions.updateTask({
        todolistId,
        taskId: task.id,
        domainModel: { status },
      }),
    );
  };

  return (
    <li>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        onChange={changeTaskStatusHandler}
        disabled={disabled}
      />
      <EditableSpan
        titleValue={task.title}
        onChange={onChangeTaskHandler}
        disabled={disabled}
      />
      <IconButton
        aria-label="delete"
        onClick={deleteTaskHandler}
        disabled={disabled}
      >
        <BackspaceIcon />
      </IconButton>
    </li>
  );
};
