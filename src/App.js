import { render } from "@testing-library/react";
import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, users: res.data });
  }

  //Search users from Github
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, users: res.data.items });
  };

  //Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  //Alert system
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 5000); //alert dissapears after 5s
  };

  render() {
    const { users, loading } = this.state;

    return (
      <div className="className">
        <Navbar icon="fa-brands fa-github" />
        <div className="container">
          <Alert alert={this.state.alert}></Alert>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          ></Search>
          <Users loading={loading} users={users}></Users>
        </div>
      </div>
    );
  }
}

export default App;
