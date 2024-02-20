import { TaskPriorities, TaskStatuses } from "common/enums";
import { TasksState, tasksActions, tasksReducer } from "../tasksSlice";
import { todolistsActions } from "../../todolists/todolistsSlice";

let startState: TasksState;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId1",
        taskStatus: "idle",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId1",
        taskStatus: "idle",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId1",
        taskStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId2",
        taskStatus: "idle",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId2",
        taskStatus: "idle",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        todoListId: "todolistId2",
        taskStatus: "idle",
      },
    ],
  };
});

test("tasks should be added for todolist", () => {
  const endState = tasksReducer(
    { todolistId1: [], todolistId2: [] },
    tasksActions.setTasks.fulfilled(
      {
        todolistId: "todolistId2",
        tasks: startState["todolistId2"],
      },
      "requestId",
      "todolistId2",
    ),
  );

  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId1"].length).toBe(0);
});

test("correct task should be added to correct array", () => {
  const newTask = {
    id: "4",
    title: "juce",
    status: TaskStatuses.New,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriorities.Low,
    startDate: "",
    todoListId: "todolistId2",
  };

  const endState = tasksReducer(
    startState,
    tasksActions.addTask.fulfilled(
      { todolistId: "todolistId2", task: newTask },
      "requestId",
      { todolistId: "todolistId2", title: "juce" },
    ),
  );
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
});

test("correct task should be deleted from correct array", () => {
  const payload = { todolistId: "todolistId2", taskId: "2" };
  const endState = tasksReducer(
    startState,
    tasksActions.deleteTask.fulfilled(payload, "requestId", payload),
  );
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("status of specified task should be changed", () => {
  const payload = {
    todolistId: "todolistId2",
    taskId: "2",
    domainModel: { status: TaskStatuses.New },
  };
  const endState = tasksReducer(
    startState,
    tasksActions.updateTask.fulfilled(payload, "requestId", payload),
  );

  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test("correct task should change its name", () => {
  const payload = {
    todolistId: "todolistId2",
    taskId: "2",
    domainModel: { title: "coffee" },
  };
  const endState = tasksReducer(
    startState,
    tasksActions.updateTask.fulfilled(payload, "requestId", payload),
  );

  expect(endState["todolistId2"][1].title).toBe("coffee");
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test("new array should be added when new todolist is added", () => {
  const newTodolist = {
    id: "todolistId3",
    title: "new todolist",
    addedDate: "",
    order: 0,
  };

  const endState = tasksReducer(
    startState,
    todolistsActions.addTodolist.fulfilled(
      { todolist: newTodolist },
      "requestId",
      "new todolist",
    ),
  );

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(
    startState,
    todolistsActions.deleteTodolist.fulfilled(
      { id: "todolistId2" },
      "requestId",
      "todolistId2",
    ),
  );

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todolists", () => {
  const action = todolistsActions.setTodolists.fulfilled(
    {
      todolists: [
        { id: "1", title: "title 1", order: 0, addedDate: "" },
        { id: "2", title: "title 2", order: 0, addedDate: "" },
      ],
    },
    "requestId",
    undefined,
  );

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toBeDefined();
  expect(endState["2"]).toBeDefined();
});
