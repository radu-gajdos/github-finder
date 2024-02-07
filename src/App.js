import { render } from "@testing-library/react";
import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users"

class App extends Component {

  render() {
    return (
      <div className="className">
        <Navbar icon="fa-brands fa-github"/>
        <div className="container">
        <Users></Users>
        </div>
      </div>
    );
  }
}

export default App;