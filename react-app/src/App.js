import React, { Component } from "react";
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import "./App.css";
import Home from "./views/Home";
import NaviBar from "./components/NavBar";
import BookLists from "./views/BookLists";
import Login from "./views/Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NaviBar></NaviBar>
        <Route exact={true} path='/' render={() => (
                <div id="main">
                  <Home />
                </div>
              )}/>
        <Route exact={true} path='/MyList' render={() => (
                <div id="main">
                  <BookLists />
                </div>
              )}/>
        <Route exact={true} path="/Login">
          {localStorage.getItem("id") ? <Redirect to="/" /> : <Login />}
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
