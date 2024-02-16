import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "common/hooks";
import { TaskResponse } from "features/TodolistsList/api/tasks/tasksApi.types";
import { tasksActions } from "features/TodolistsList/model/tasks/tasksSlice";

type Props = {
  todolistId: string;
  task: TaskResponse;
};

export const Task = ({ todolistId, task }: Props) => {
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

  return (
    <li>
      <EditableSpan titleValue={task.title} onChange={onChangeTaskHandler} />
    </li>
  );
};
