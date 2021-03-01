import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./app/layouts/App";
import "./index.css";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
