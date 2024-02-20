import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { BaseResponse } from "common/types";

type Props = {
  addItem: (newTitle: string) => Promise<any>;
  disabled?: boolean;
};

export const AddItemForm = ({ addItem, disabled = false }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<null | string>(null);

  const addItemHandler = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      addItem(newTitle)
        .then((res) => {
          setTitle("");
        })
        .catch((e: BaseResponse) => {
          if (e?.resultCode) {
            setError(e.messages[0]);
          }
        });
    } else {
      setError("Title is required");
    }
  };
  const ChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const addItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.key === "Enter") {
      addItemHandler();
    }
  };
  return (
    <div>
      <TextField
        error={!!error}
        id="standard-basic"
        label={error ? "Title" : "type smth..."}
        size="small"
        variant="standard"
        value={title}
        disabled={disabled}
        onChange={ChangeTitleHandler}
        helperText={error}
        onKeyDown={addItemOnEnterHandler}
      />
      <IconButton onClick={addItemHandler} disabled={disabled}>
        <AddTaskIcon />
      </IconButton>
    </div>
  );
};
