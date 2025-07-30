import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import FriendsList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";
import AuthContextProvider from "./contexts/AuthContextProvider";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Header />
        <Switch>
        <Route path="/login" component={LoginForm} />
        <PrivateRoute path="/friends/add" component={AddFriend} />
        <PrivateRoute path="/friends" component={FriendsList} />
        <PrivateRoute exact path="/" component={FriendsList} />
      </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;

