import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(

<BrowserRouter>
  <App />
</BrowserRouter>

);
