import { AppState, appActions, appReducer } from "app/appSlice";

let startState: AppState;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(
    startState,
    appActions.setAppError({ error: "some error" }),
  );

  expect(endState.error).toBe("some error");
});
