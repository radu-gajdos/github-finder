import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/pages/Home"
import NotFound from "./components/pages/NotFound"

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar icon="fa-brands fa-github" />
            <div className="container">
              <Alert />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Home/>
                  }
                />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/user/:login" element={<User />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
