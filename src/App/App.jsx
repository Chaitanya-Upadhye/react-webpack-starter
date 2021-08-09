import React, { useState, useEffect } from "react";
import { Router, Route, Link } from "react-router-dom";
import { history } from "../helpers/history";
import { authService } from "../services/authService";
import { AuthorisedRoute } from "../components/AuthorisedRoute.jsx";
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setLoggedInUser(authService.currentUser);
  }, []);

  function logout() {
    authService.logout();
    history.push("/login");
  }

  return (
    <Router history={history}>
      <div>
        {loggedInUser && (
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <a onClick={logout} className="nav-item nav-link">
                Logout
              </a>
            </div>
          </nav>
        )}
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <AuthorisedRoute exact path="/" component={HomePage} />
                <Route
                  path="/login"
                  component={() => <LoginPage history={history}></LoginPage>}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
