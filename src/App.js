import { render } from "@testing-library/react";
import "./App.css";
import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
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

  //Get single user from Github
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, user: res.data });
  };

  //Get a users Repositories

  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, repos: res.data });
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
    const { users, user, repos, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar icon="fa-brands fa-github" />
          <div className="container">
            <Alert alert={this.state.alert}></Alert>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                }
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/user/:login"
                element={
                  <User
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
