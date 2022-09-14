import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import AppNavbar from "./layouts/navbar/appNavbar";
import HomeCard from "./pages/landing/home/card/card";
import routes from "./services/routes";

function App() {
  const isLoggedIn = window.localStorage.getItem("currentlyLoggedInUser")
    ? true
    : false;
  const routing = useRoutes(routes(isLoggedIn));

  return <>{routing}</>;
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
