import React, { useState } from "react";
import { Trash, Pencil, XCircle, CheckLg } from "react-bootstrap-icons";
import { authService } from "../../services/authService";

export default function ToDo({
  toDoText,
  id,
  deleteToDo = () => {},
  updateToDo = () => {},
}) {
  const [editMode, setEditMode] = useState(false);
  const [editableToDoText, setEditableToDoText] = useState(toDoText);

  return (
    //key for list itme will be id of the to do generated in the db
    <li
      key={id}
      className="list-group-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {!editMode ? (
        <span style={{ marginRight: "auto" }}>{toDoText}</span>
      ) : (
        <input
          type="text"
          className="form-control"
          style={{ marginRight: "15px" }}
          value={editableToDoText}
          onChange={(e) => {
            setEditableToDoText(e.target.value);
          }}
        ></input>
      )}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!editMode ? (
          <Trash
            onClick={() => {
              deleteToDo(id);
            }}
          ></Trash>
        ) : (
          <XCircle
            onClick={() => {
              setEditMode(false);
            }}
          ></XCircle>
        )}

        {!editMode ? (
          <Pencil
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={() => {
              setEditMode(true);
            }}
          ></Pencil>
        ) : (
          <CheckLg
            style={{ cursor: "pointer", marginLeft: "15px" }}
            onClick={() => {
              updateToDo({
                text: editableToDoText,
                Id: id,
                userId: authService.currentUserValue.id,
              });
              setEditMode(false);
            }}
          />
        )}
      </span>
    </li>
  );
}
