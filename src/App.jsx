import React from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./Components/Header/Header";
import Login from "./Pages/LoginPage";
import Home from "./Pages/HomePage";
import Signup from "./Pages/SignupPage";

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
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
