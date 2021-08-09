import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authService } from "../services/authService";

export const AuthorisedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authService.currentUserValue;
      if (!currentUser) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
