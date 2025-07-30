import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import FriendsList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";

function App() {
  return (
    <div className="App">
      <Header />
      
      <Switch>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route path="/friends/add">
        <AddFriend />
      </Route>
      <Route path="/">
        <FriendsList />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
