import {
  FilterValues,
  TodolistDomain,
  todolistsActions,
  todolistsReducer,
} from "../todolistsSlice";

let todolistId1: string;
let todolistId2: string;

let startState: TodolistDomain[];

beforeEach(() => {
  todolistId1 = "123";
  todolistId2 = "456";

  startState = [
    {
      id: todolistId1,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      todolistStatus: "idle",
    },
    {
      id: todolistId2,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      todolistStatus: "idle",
    },
  ];
});

test("todolists should be added", () => {
  const action = todolistsActions.setTodolists.fulfilled(
    { todolists: startState },
    "requestId",
    undefined,
  );

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});

test("correct todolist should be added", () => {
  const newTodolist = {
    id: "todolistId3",
    title: "new todolist",
    addedDate: "",
    order: 0,
  };

  const endState = todolistsReducer(
    startState,
    todolistsActions.addTodolist.fulfilled(
      { todolist: newTodolist },
      "requestId",
      "new todolist",
    ),
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("new todolist");
  expect(endState[0].id).toBe("todolistId3");
});

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(
    startState,
    todolistsActions.deleteTodolist.fulfilled(
      { id: todolistId2 },
      "requestId",
      todolistId2,
    ),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId1);
});

test("correct todolist should be changed title", () => {
  const endState = todolistsReducer(
    startState,
    todolistsActions.changeTodolistTitle.fulfilled(
      { id: todolistId2, title: "new title" },
      "requestId",
      { id: todolistId2, title: "new title" },
    ),
  );

  expect(endState[0].title).toBe("What to buy");
  expect(endState[1].title).toBe("new title");
});

test("correct filter of todolist should be changed", () => {
  const newFilter: FilterValues = "active";
  const endState = todolistsReducer(
    startState,
    todolistsActions.changeTodolistFilter({
      id: todolistId1,
      filter: newFilter,
    }),
  );

  expect(endState[0].filter).toBe("active");
  expect(endState[1].filter).toBe("all");
});
