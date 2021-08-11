import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_ROUTES } from "../../AppConstants";
import {
  authService,
  handleResponse,
  authHeader,
} from "../../services/authService";

function useTodos(reloadList) {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    getAndSetToDos();
  }, [reloadList]);

  function getAndSetToDos() {
    try {
      fetch(API_ROUTES.getUserTodos, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ Id: authService.currentUser.id }),
      })
        .then(handleResponse)
        .then((todos) => setToDos(todos));

      // setToDos()
    } catch (error) {}
  }
  async function addToDo(text) {
    try {
      fetch(API_ROUTES.addToDo, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ userId: authService.currentUser.id, text }),
      })
        .then(handleResponse)
        .then((toDo) => setToDos([...toDos, toDo]));
    } catch (error) {}
  }

  function deleteToDo(id) {
    try {
      fetch(API_ROUTES.deleteToDo, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ id }),
      })
        .then(handleResponse)

        .then((resp) => setToDos([...toDos.filter((toDo) => toDo.id !== id)]));
    } catch (error) {
      console.log(error);
    }
  }
  function updateToDo(toDoObj) {
    try {
      fetch(API_ROUTES.updateToDo, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ ...toDoObj }),
      })
        .then(handleResponse)
        .then((toDo) =>
          setToDos([
            ...toDos.map((todo) => {
              if (todo.id === toDo.id) todo = toDo;
              return todo;
            }),
          ])
        );
    } catch (error) {}
  }
  return {
    toDos,
    setToDos,
    addToDo,
    deleteToDo,
    updateToDo,
    reload: getAndSetToDos,
  };
}

export default useTodos;
