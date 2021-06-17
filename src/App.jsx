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
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import AddPlacePage from "./Pages/AddPlacePage";
import PlaceDetail from "./Pages/PlaceDetailPage";

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
        {HomePage}
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/add">{AddPlacePage}</AuthenticatedRoute>
      <AuthenticatedRoute path="/place/:id">{PlaceDetail}</AuthenticatedRoute>
      <UnauthenticatedRoutes path="/login">{LoginPage}</UnauthenticatedRoutes>
      <UnauthenticatedRoutes path="/signup">{SignupPage}</UnauthenticatedRoutes>
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
