import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./app/layouts/App";
import { createBrowserHistory } from "history";
import { GlobalStyle } from "./app/common/globalStyle";
import { Provider } from "react-redux";
import store from "./app/stores/store"
import 'react-toastify/dist/ReactToastify.css';

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <GlobalStyle />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
