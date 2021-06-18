import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-ui/core";

import Header from "./Components/Header/Header";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import AddPlacePage from "./Pages/AddPlacePage";
import PlaceDetail from "./Pages/PlaceDetailPage";
import EditPlace from "./Pages/PlaceEditPage";
import PlaceReviewPlace from "./Pages/PlaceReviewPage";
import ExplorePage from "./Pages/ExplorePage";

import { AuthenticatedRoute } from "./Routes/PrivateRoute";
import { UnauthenticatedRoutes } from "./Routes/PublicRoute";

import { useTheme } from "./hooks/useTheme";
import fo0foPage from "./Pages/404page";

const AppRoutes = () => {
  return (
    <Switch>
      <AuthenticatedRoute path="/" exact>
        {HomePage}
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/place/edit/:id">
        {EditPlace}
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/place/:id/:action/review/:commentId?">
        {PlaceReviewPlace}
      </AuthenticatedRoute>
      <AuthenticatedRoute path="/explore">{ExplorePage}</AuthenticatedRoute>
      <AuthenticatedRoute path="/add">{AddPlacePage}</AuthenticatedRoute>
      <AuthenticatedRoute exact path="/place/:id">
        {PlaceDetail}
      </AuthenticatedRoute>
      <UnauthenticatedRoutes path="/login">{LoginPage}</UnauthenticatedRoutes>
      <UnauthenticatedRoutes path="/signup">{SignupPage}</UnauthenticatedRoutes>
      <AuthenticatedRoute path="*">{fo0foPage}</AuthenticatedRoute>
    </Switch>
  );
};

function App() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ToastContainer position="bottom-right" />
        <Header />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
