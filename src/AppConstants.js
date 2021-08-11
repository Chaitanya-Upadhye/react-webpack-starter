const BASE_API_URL = "https://localhost:44316";

export const API_ROUTES = {
  authenticate: `${BASE_API_URL}/api/users/authenticate`,
  getusers: `${BASE_API_URL}/api/users`,
  getUserTodos: `${BASE_API_URL}/api/users/todos`,
  addToDo: `${BASE_API_URL}/api/users/add-todo`,
  deleteToDo: `${BASE_API_URL}/api/users/todo/delete`,
  updateToDo: `${BASE_API_URL}/api/users/todo/update`,
};
