import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function AdminRoute({ Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (localStorage.getItem("token")) {
          if (localStorage.getItem("role") === "admin") {
            return <Component />;
          } else {
            return (
              <h1>Not Found</h1>
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
