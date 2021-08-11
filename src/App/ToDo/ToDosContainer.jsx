import React, { useState, useEffect } from "react";
import { Trash } from "react-bootstrap-icons";
import ToDo from "./ToDo.jsx";
import useTodos from "./useTodos.js";

export default function ToDosContainer() {
  const [inputState, setInputState] = useState("");

  const { toDos, setToDos, addToDo, deleteToDo, updateToDo, reload } =
    useTodos();
  return (
    <React.Fragment>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="To Do.."
          value={inputState}
          onChange={(e) => {
            setInputState(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={onAddToDoClick}
          disabled={inputState === ""}
        >
          Add To Do
        </button>
      </div>

      <ul className="list-group">
        {toDos.map((toDo) => (
          <ToDo
            key={toDo?.id}
            {...toDo}
            deleteToDo={deleteToDo}
            updateToDo={updateToDo}
          ></ToDo>
        ))}
      </ul>
    </React.Fragment>
  );

  async function onAddToDoClick() {
    try {
      await addToDo(inputState);
      setInputState("");
    } catch (error) {
      console.log(error);
    }
  }
}
