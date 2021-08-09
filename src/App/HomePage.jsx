import React, { useEffect, useState } from "react";
import {
  authService,
  authHeader,
  handleResponse,
} from "../services/authService";
import { API_ROUTES } from "../AppConstants";

function HomePage() {
  const [currentUser, setCurrentUser] = useState(authService.currentUserValue);
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    function fetchAllUsers() {
      try {
        const users = fetch(API_ROUTES.getusers, {
          headers: authHeader(),
        })
          .then(handleResponse)
          .then((usersState) => setUsersList(usersState));
      } catch (error) {}
    }
    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1>Hi {currentUser.firstName}!</h1>
      <p>You're logged in with React & JWT!!</p>
      <h3>Users from secure api end point:</h3>
      {usersList && (
        <ul>
          {usersList.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
