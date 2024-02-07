import { render } from "@testing-library/react";
import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import UserItem from "./components/users/UserItem"

class App extends Component {

  constructor(){
    super();
    this.state={
      id: 'id',
      login: 'mojombo',
      avatar_url: 'step="0.01"',
      html_url: 'https://github.com/mojombo',
    }
  }

  render() {
    return (
      <div className="className">
        <Navbar icon="fa-brands fa-github"/>
        <UserItem></UserItem>
      </div>
    );
  }
}

export default App;