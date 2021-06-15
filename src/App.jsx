import React from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./Components/NavBar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";

const UnauthenticatedRoutes = ({ children: Children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={() => (!isAuth ? <Children /> : <Redirect to="/" />)}
    ></Route>
  );
};

const AuthenticatedRoute = ({ children: Children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={() => (isAuth ? <Children /> : <Redirect to="/login" />)}
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <Switch>
      <AuthenticatedRoute path="/" exact>
        {Home}
      </AuthenticatedRoute>
      <UnauthenticatedRoutes path="/login">{Login}</UnauthenticatedRoutes>
      <UnauthenticatedRoutes path="/signup">{Signup}</UnauthenticatedRoutes>
    </Switch>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <NavBar />
      <AppRoutes />
    </Router>
  );
}

export default App;
