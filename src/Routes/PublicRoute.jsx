import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const UnauthenticatedRoutes = ({ children: Children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={() => (!isAuth ? <Children /> : <Redirect to="/" />)}
    ></Route>
  );
};
